import type { Meta, StoryObj } from '@storybook/react';
import { IconMinus } from '../icons/IconMinus';

const meta: Meta<typeof IconMinus> = {
  title: 'Icons/IconMinus',
  component: IconMinus,
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

type Story = StoryObj<typeof IconMinus>;

export const Default: Story = {};
