import type { Meta, StoryObj } from '@storybook/react';
import { IconLoading } from '../icons/IconLoading';

const meta: Meta<typeof IconLoading> = {
  title: 'Icons/IconLoading',
  component: IconLoading,
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

type Story = StoryObj<typeof IconLoading>;

export const Default: Story = {};
