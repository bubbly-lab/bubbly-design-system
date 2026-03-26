import type { Meta, StoryObj } from '@storybook/react';
import { IconWarningCircle } from '../icons/IconWarningCircle';

const meta: Meta<typeof IconWarningCircle> = {
  title: 'Icons/IconWarningCircle',
  component: IconWarningCircle,
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

type Story = StoryObj<typeof IconWarningCircle>;

export const Default: Story = {};
