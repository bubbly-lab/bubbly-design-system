import type { Meta, StoryObj } from '@storybook/react';
import { IconChevronRight } from '../icons/IconChevronRight';

const meta: Meta<typeof IconChevronRight> = {
  title: 'Icons/IconChevronRight',
  component: IconChevronRight,
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

type Story = StoryObj<typeof IconChevronRight>;

export const Default: Story = {};
