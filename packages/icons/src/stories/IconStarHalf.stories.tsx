import type { Meta, StoryObj } from '@storybook/react';
import { IconStarHalf } from '../icons/IconStarHalf';

const meta: Meta<typeof IconStarHalf> = {
  title: 'Icons/IconStarHalf',
  component: IconStarHalf,
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

type Story = StoryObj<typeof IconStarHalf>;

export const Default: Story = {};
