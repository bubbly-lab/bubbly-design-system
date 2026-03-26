import { describe, expect, it } from 'vitest';

type IconVariant = 'outline' | 'filled';
type IconVariants = Partial<Record<IconVariant, string>>;

function toComponentName(iconName: string): string {
  return `Icon${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;
}

function toStoryFileName(iconName: string): string {
  return `${toComponentName(iconName)}.stories.tsx`;
}

function isDualVariant(variants: IconVariants): boolean {
  return Boolean(variants.outline && variants.filled);
}

function generateStoryContent(
  iconName: string,
  variants: IconVariants,
): string {
  const componentName = toComponentName(iconName);
  const dualVariant = isDualVariant(variants);

  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '../icons/${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Icons/${componentName}',
  component: ${componentName},
  decorators: [
    (Story, context) => (
      <span style={{ color: context.args.color }}>
        <Story />
      </span>
    ),
  ],
  argTypes: {
    size: { control: 'text' },
    color: { control: 'color' },
    title: { control: 'text' },${dualVariant ? "\n    filled: { control: 'boolean' }," : ''}
  },
  args: {
    size: '48',
    color: '#babacb',${dualVariant ? '\n    filled: false,' : ''}
  },
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {};
`;
}

describe('generate-stories: toComponentName', () => {
  it('converts single word to Icon-prefixed PascalCase', () => {
    expect(toComponentName('home')).toBe('IconHome');
  });

  it('converts camelCase arrow name to Icon-prefixed PascalCase', () => {
    expect(toComponentName('arrowLeft')).toBe('IconArrowLeft');
  });

  it('converts camelCase user name to Icon-prefixed PascalCase', () => {
    expect(toComponentName('userCircle')).toBe('IconUserCircle');
  });
});

describe('generate-stories: toStoryFileName', () => {
  it('creates the story file name for a single word icon', () => {
    expect(toStoryFileName('home')).toBe('IconHome.stories.tsx');
  });

  it('creates the story file name for a camelCase icon', () => {
    expect(toStoryFileName('arrowLeft')).toBe('IconArrowLeft.stories.tsx');
  });
});

describe('generate-stories: isDualVariant', () => {
  it('returns true when both outline and filled variants exist', () => {
    expect(isDualVariant({ outline: 'outline-id', filled: 'filled-id' })).toBe(
      true,
    );
  });

  it('returns false when only outline exists', () => {
    expect(isDualVariant({ outline: 'outline-id' })).toBe(false);
  });

  it('returns false when only filled exists', () => {
    expect(isDualVariant({ filled: 'filled-id' })).toBe(false);
  });

  it('returns false when no variants exist', () => {
    expect(isDualVariant({})).toBe(false);
  });
});

describe('generate-stories: generateStoryContent', () => {
  it('includes filled argType for dual-variant icons', () => {
    const result = generateStoryContent('home', {
      outline: 'outline-id',
      filled: 'filled-id',
    });

    expect(result).toContain("filled: { control: 'boolean' }");
  });

  it('sets filled: false as default arg for dual-variant icons', () => {
    const result = generateStoryContent('home', {
      outline: 'outline-id',
      filled: 'filled-id',
    });

    expect(result).toContain('filled: false');
  });

  it('does not include a separate Filled story export for dual-variant icons', () => {
    const result = generateStoryContent('home', {
      outline: 'outline-id',
      filled: 'filled-id',
    });

    expect(result).not.toContain('export const Filled: Story');
  });

  it('does not include filled controls or story for single outline icons', () => {
    const result = generateStoryContent('plus', {
      outline: 'outline-id',
    });

    expect(result).not.toContain("filled: { control: 'boolean' }");
    expect(result).not.toContain('export const Filled: Story');
    expect(result).not.toContain('filled: false');
  });

  it('does not include filled argType for single filled-only icons', () => {
    const result = generateStoryContent('star', {
      filled: 'filled-id',
    });

    expect(result).not.toContain("filled: { control: 'boolean' }");
    expect(result).not.toContain('export const Filled: Story');
  });

  it('uses the correct icon import path', () => {
    const result = generateStoryContent('home', {
      outline: 'outline-id',
      filled: 'filled-id',
    });

    expect(result).toContain("import { IconHome } from '../icons/IconHome';");
  });

  it('uses the correct Storybook title', () => {
    const result = generateStoryContent('home', {
      outline: 'outline-id',
      filled: 'filled-id',
    });

    expect(result).toContain("title: 'Icons/IconHome'");
  });

  it('uses the default size and color args', () => {
    const result = generateStoryContent('home', {
      outline: 'outline-id',
      filled: 'filled-id',
    });

    expect(result).toContain("size: '48'");
    expect(result).toContain("color: '#babacb'");
  });

  it('includes a color decorator in the meta', () => {
    const result = generateStoryContent('home', {
      outline: 'outline-id',
      filled: 'filled-id',
    });

    expect(result).toContain('decorators:');
    expect(result).toContain('context.args.color');
  });
});
