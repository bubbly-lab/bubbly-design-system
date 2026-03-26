import type { Meta, StoryObj } from '@storybook/react';
import { IconFilter } from '../icons/IconFilter';

const meta: Meta<typeof IconFilter> = {
  title: 'Icons/IconFilter',
  component: IconFilter,
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

type Story = StoryObj<typeof IconFilter>;

export const Default: Story = {};
