import type { Meta, StoryObj } from '@storybook/react';
import { IconArrowUp } from '../icons/IconArrowUp';

const meta: Meta<typeof IconArrowUp> = {
  title: 'Icons/IconArrowUp',
  component: IconArrowUp,
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
  },
  args: {
    size: '48',
    color: '#babacb',
  },
};

export default meta;

type Story = StoryObj<typeof IconArrowUp>;

export const Default: Story = {};
