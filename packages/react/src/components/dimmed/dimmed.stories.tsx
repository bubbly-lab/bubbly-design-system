import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Dimmed } from './dimmed';

const blurOptions: Array<boolean> = [true, false];

const demoContainerStyle = {
  position: 'relative',
  width: '120px',
  height: '120px',
  overflow: 'hidden',
  borderRadius: '16px',
  background:
    'linear-gradient(135deg, rgb(133 102 255) 0%, rgb(255 122 122) 100%)',
} as const;

const meta: Meta<typeof Dimmed> = {
  title: 'Components/Dimmed',
  component: Dimmed,
  argTypes: {
    blur: { control: 'boolean' },
  },
  args: {
    blur: true,
  },
};

export default meta;
type Story = StoryObj<typeof Dimmed>;

export const Default: Story = {
  render: (args: ComponentProps<typeof Dimmed>) => (
    <div style={demoContainerStyle}>
      <Dimmed {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {blurOptions.map(blur => (
        <div
          key={String(blur)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <div style={demoContainerStyle}>
            <Dimmed blur={blur} />
          </div>
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
              color: '#999',
            }}
          >
            blur={String(blur)}
          </span>
        </div>
      ))}
    </div>
  ),
};
