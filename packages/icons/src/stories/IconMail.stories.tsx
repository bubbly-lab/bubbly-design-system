import type { Meta, StoryObj } from '@storybook/react';
import { IconMail } from '../icons/IconMail';

const meta: Meta<typeof IconMail> = {
  title: 'Icons/IconMail',
  component: IconMail,
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

type Story = StoryObj<typeof IconMail>;

export const Default: Story = {};
