const processAny = globalThis as any;
const nodeProcess = processAny.process;

if (!nodeProcess?.getBuiltinModule) {
  throw new Error('Node.js with process.getBuiltinModule is required');
}

const fs = nodeProcess.getBuiltinModule('node:fs') as any;
const path = nodeProcess.getBuiltinModule('node:path') as any;

const scriptDirUrl = new URL('.', import.meta.url);
const SCRIPT_DIR = decodeURIComponent(scriptDirUrl.pathname);
const PACKAGE_ROOT = decodeURIComponent(new URL('../', scriptDirUrl).pathname);
const MANIFEST_PATH = path.join(SCRIPT_DIR, 'icon-manifest.json');
const STORIES_DIR = path.join(PACKAGE_ROOT, 'src', 'stories');

type IconVariant = 'outline' | 'filled';
type IconVariants = Partial<Record<IconVariant, string>>;
type IconManifest = Record<string, IconVariants>;

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

async function main(): Promise<void> {
  const manifest = JSON.parse(
    fs.readFileSync(MANIFEST_PATH, 'utf8'),
  ) as IconManifest;

  fs.rmSync(STORIES_DIR, { recursive: true, force: true });
  fs.mkdirSync(STORIES_DIR, { recursive: true });

  let generated = 0;
  for (const [iconName, variants] of Object.entries(manifest)) {
    const storyContent = generateStoryContent(iconName, variants);
    const outputPath = path.join(STORIES_DIR, toStoryFileName(iconName));
    fs.writeFileSync(outputPath, storyContent, 'utf8');
    generated += 1;
  }

  console.log(`[generate-stories] Generated ${generated} story files.`);
}

main().catch((error: unknown) => {
  console.error('[generate-stories] Error:', error);
  nodeProcess.exit(1);
});
