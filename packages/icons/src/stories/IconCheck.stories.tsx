import type { Meta, StoryObj } from '@storybook/react';
import { IconCheck } from '../icons/IconCheck';

const meta: Meta<typeof IconCheck> = {
  title: 'Icons/IconCheck',
  component: IconCheck,
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

type Story = StoryObj<typeof IconCheck>;

export const Default: Story = {};
