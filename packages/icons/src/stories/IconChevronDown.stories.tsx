import type { Meta, StoryObj } from '@storybook/react';
import { IconChevronDown } from '../icons/IconChevronDown';

const meta: Meta<typeof IconChevronDown> = {
  title: 'Icons/IconChevronDown',
  component: IconChevronDown,
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

type Story = StoryObj<typeof IconChevronDown>;

export const Default: Story = {};
