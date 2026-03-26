import type { Meta, StoryObj } from '@storybook/react';
import { IconQuestionCircle } from '../icons/IconQuestionCircle';

const meta: Meta<typeof IconQuestionCircle> = {
  title: 'Icons/IconQuestionCircle',
  component: IconQuestionCircle,
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

type Story = StoryObj<typeof IconQuestionCircle>;

export const Default: Story = {};
