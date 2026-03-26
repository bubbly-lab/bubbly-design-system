import type { Meta, StoryObj } from '@storybook/react';
import { IconChevronLeft } from '../icons/IconChevronLeft';

const meta: Meta<typeof IconChevronLeft> = {
  title: 'Icons/IconChevronLeft',
  component: IconChevronLeft,
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

type Story = StoryObj<typeof IconChevronLeft>;

export const Default: Story = {};
