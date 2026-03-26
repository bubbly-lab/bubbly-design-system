import type { Meta, StoryObj } from '@storybook/react';
import { IconSearch } from '../icons/IconSearch';

const meta: Meta<typeof IconSearch> = {
  title: 'Icons/IconSearch',
  component: IconSearch,
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

type Story = StoryObj<typeof IconSearch>;

export const Default: Story = {};
