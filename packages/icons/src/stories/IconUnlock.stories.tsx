import type { Meta, StoryObj } from '@storybook/react';
import { IconUnlock } from '../icons/IconUnlock';

const meta: Meta<typeof IconUnlock> = {
  title: 'Icons/IconUnlock',
  component: IconUnlock,
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

type Story = StoryObj<typeof IconUnlock>;

export const Default: Story = {};
