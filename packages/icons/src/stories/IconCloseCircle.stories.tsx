import type { Meta, StoryObj } from '@storybook/react';
import { IconCloseCircle } from '../icons/IconCloseCircle';

const meta: Meta<typeof IconCloseCircle> = {
  title: 'Icons/IconCloseCircle',
  component: IconCloseCircle,
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

type Story = StoryObj<typeof IconCloseCircle>;

export const Default: Story = {};
