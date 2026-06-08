import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { button } from 'styled-system/recipes';
import { Button } from './button';

const { variantMap } = button;

const INVALID_COMBINATIONS: Record<string, string[]> = {
  brand: ['outline'],
  neutral: ['solid'],
  critical: ['weak', 'outline'],
};

function isValidCombination(color: string, type: string) {
  return !INVALID_COMBINATIONS[color]?.includes(type);
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=32-3',
    },
  },
  argTypes: {
    color: { control: 'select', options: variantMap.color },
    type: { control: 'select', options: variantMap.type },
    size: { control: 'select', options: variantMap.size },
    disabled: { control: 'boolean' },
    loading: {
      control: 'boolean',
      description:
        'Shows a spinner and forces `disabled` + `aria-busy`. Content stays in the DOM (visibility:hidden) so width does not jump.',
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { onClick: fn() },
  // B1 happy: 클릭 시 onClick이 1회 호출된다.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },
  // B3 regression: disabled면 [disabled] 속성이 붙고 onClick이 호출되지 않는다.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: { loading: true, onClick: fn(), 'aria-label': 'Button' },
  // B2 edge: loading면 aria-busy='true' + disabled로 onClick이 억제된다.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {variantMap.color.map(color => (
        <div key={color}>
          <div
            style={{
              marginBottom: '8px',
              color: '#999',
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
            }}
          >
            {color}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {variantMap.type
              .filter(type => isValidCombination(color, type))
              .map(type => (
                <div
                  key={type}
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  {variantMap.size.map(size => (
                    <Button key={size} color={color} type={type} size={size}>
                      {type} {size}
                    </Button>
                  ))}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const WithPrefixIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      {variantMap.size.map(size => (
        <Button key={size} size={size} prefixIcon={<PlusIcon />}>
          Label
        </Button>
      ))}
    </div>
  ),
};

export const WithSuffixIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      {variantMap.size.map(size => (
        <Button key={size} size={size} suffixIcon={<ChevronRightIcon />}>
          Label
        </Button>
      ))}
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {variantMap.color.map(color => (
        <div key={color}>
          <div
            style={{
              marginBottom: '8px',
              color: '#999',
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
            }}
          >
            {color}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {variantMap.type
              .filter(type => isValidCombination(color, type))
              .map(type => (
                <div
                  key={type}
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <Button color={color} type={type}>
                    Default
                  </Button>
                  <Button color={color} type={type} disabled>
                    Disabled
                  </Button>
                  <Button
                    color={color}
                    type={type}
                    loading
                    aria-label="Loading"
                  >
                    Loading
                  </Button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Interactive-state matrix. The pseudo-states addon rewrites stylesheets to
// force :hover / :focus-visible / :active so designers can review every state
// against Figma without manually hovering each button.
export const InteractiveStates: Story = {
  parameters: {
    pseudo: {
      hover: ['#state-hover'],
      focusVisible: ['#state-focus'],
      active: ['#state-active'],
    },
  },
  render: () => {
    const states = [
      { id: undefined, label: 'default' },
      { id: 'state-hover', label: 'hover' },
      { id: 'state-focus', label: 'focus' },
      { id: 'state-active', label: 'active' },
    ] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {variantMap.color.map(color => (
          <div key={color}>
            <div
              style={{
                marginBottom: '8px',
                color: '#999',
                fontSize: '12px',
                fontFamily: 'var(--fonts-sans)',
              }}
            >
              {color}
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {variantMap.type
                .filter(type => isValidCombination(color, type))
                .map(type => (
                  <div
                    key={type}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    {states.map(({ id, label }) => (
                      <Button key={label} id={id} color={color} type={type}>
                        {label}
                      </Button>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const WidthFull: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
        width: '320px',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      <Button>width = hug (default)</Button>
      <Button style={{ width: '100%' }}>width = fill</Button>
    </div>
  ),
};
