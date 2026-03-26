import type { Meta, StoryObj } from '@storybook/react';
import { IconCopy } from '../icons/IconCopy';

const meta: Meta<typeof IconCopy> = {
  title: 'Icons/IconCopy',
  component: IconCopy,
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

type Story = StoryObj<typeof IconCopy>;

export const Default: Story = {};
