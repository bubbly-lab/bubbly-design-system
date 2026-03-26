import type { Meta, StoryObj } from '@storybook/react';
import { IconArrowRight } from '../icons/IconArrowRight';

const meta: Meta<typeof IconArrowRight> = {
  title: 'Icons/IconArrowRight',
  component: IconArrowRight,
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

type Story = StoryObj<typeof IconArrowRight>;

export const Default: Story = {};
