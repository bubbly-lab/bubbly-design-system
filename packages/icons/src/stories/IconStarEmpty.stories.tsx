import type { Meta, StoryObj } from '@storybook/react';
import { IconStarEmpty } from '../icons/IconStarEmpty';

const meta: Meta<typeof IconStarEmpty> = {
  title: 'Icons/IconStarEmpty',
  component: IconStarEmpty,
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

type Story = StoryObj<typeof IconStarEmpty>;

export const Default: Story = {};
