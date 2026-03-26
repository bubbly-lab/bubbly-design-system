import type { Meta, StoryObj } from '@storybook/react';
import { IconBubble } from '../icons/IconBubble';

const meta: Meta<typeof IconBubble> = {
  title: 'Icons/IconBubble',
  component: IconBubble,
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

type Story = StoryObj<typeof IconBubble>;

export const Default: Story = {};
