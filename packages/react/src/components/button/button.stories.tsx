import type { Meta, StoryObj } from '@storybook/react';
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
  argTypes: {
    color: { control: 'select', options: variantMap.color },
    type: { control: 'select', options: variantMap.type },
    size: { control: 'select', options: variantMap.size },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { loading: true },
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
                  <Button color={color} type={type} loading>
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

export const WidthFill: Story = {
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
