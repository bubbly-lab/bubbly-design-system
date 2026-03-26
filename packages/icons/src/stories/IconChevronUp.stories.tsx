import type { Meta, StoryObj } from '@storybook/react';
import { IconChevronUp } from '../icons/IconChevronUp';

const meta: Meta<typeof IconChevronUp> = {
  title: 'Icons/IconChevronUp',
  component: IconChevronUp,
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

type Story = StoryObj<typeof IconChevronUp>;

export const Default: Story = {};
