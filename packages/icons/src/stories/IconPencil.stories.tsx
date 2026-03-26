import type { Meta, StoryObj } from '@storybook/react';
import { IconPencil } from '../icons/IconPencil';

const meta: Meta<typeof IconPencil> = {
  title: 'Icons/IconPencil',
  component: IconPencil,
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

type Story = StoryObj<typeof IconPencil>;

export const Default: Story = {};
