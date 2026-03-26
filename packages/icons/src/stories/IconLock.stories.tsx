import type { Meta, StoryObj } from '@storybook/react';
import { IconLock } from '../icons/IconLock';

const meta: Meta<typeof IconLock> = {
  title: 'Icons/IconLock',
  component: IconLock,
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

type Story = StoryObj<typeof IconLock>;

export const Default: Story = {};
