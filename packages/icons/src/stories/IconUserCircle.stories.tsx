import type { Meta, StoryObj } from '@storybook/react';
import { IconUserCircle } from '../icons/IconUserCircle';

const meta: Meta<typeof IconUserCircle> = {
  title: 'Icons/IconUserCircle',
  component: IconUserCircle,
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
    title: { control: 'text' },
    filled: { control: 'boolean' },
  },
  args: {
    size: '48',
    color: '#babacb',
    filled: false,
  },
};

export default meta;

type Story = StoryObj<typeof IconUserCircle>;

export const Default: Story = {};
