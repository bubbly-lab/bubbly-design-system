import type { Meta, StoryObj } from '@storybook/react';
import { IconPlus } from '../icons/IconPlus';

const meta: Meta<typeof IconPlus> = {
  title: 'Icons/IconPlus',
  component: IconPlus,
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

type Story = StoryObj<typeof IconPlus>;

export const Default: Story = {};
