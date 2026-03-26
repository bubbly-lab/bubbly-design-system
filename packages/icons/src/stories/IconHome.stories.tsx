import type { Meta, StoryObj } from '@storybook/react';
import { IconHome } from '../icons/IconHome';

const meta: Meta<typeof IconHome> = {
  title: 'Icons/IconHome',
  component: IconHome,
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
    filled: { control: 'boolean' },
  },
  args: {
    size: '48',
    color: '#babacb',
    filled: false,
  },
};

export default meta;

type Story = StoryObj<typeof IconHome>;

export const Default: Story = {};
