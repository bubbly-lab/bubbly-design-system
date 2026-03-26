import type { Meta, StoryObj } from '@storybook/react';
import { IconArrowDown } from '../icons/IconArrowDown';

const meta: Meta<typeof IconArrowDown> = {
  title: 'Icons/IconArrowDown',
  component: IconArrowDown,
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

type Story = StoryObj<typeof IconArrowDown>;

export const Default: Story = {};
