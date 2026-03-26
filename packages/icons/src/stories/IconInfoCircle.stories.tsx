import type { Meta, StoryObj } from '@storybook/react';
import { IconInfoCircle } from '../icons/IconInfoCircle';

const meta: Meta<typeof IconInfoCircle> = {
  title: 'Icons/IconInfoCircle',
  component: IconInfoCircle,
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

type Story = StoryObj<typeof IconInfoCircle>;

export const Default: Story = {};
