import type { Meta, StoryObj } from '@storybook/react';
import { IconKebab } from '../icons/IconKebab';

const meta: Meta<typeof IconKebab> = {
  title: 'Icons/IconKebab',
  component: IconKebab,
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

type Story = StoryObj<typeof IconKebab>;

export const Default: Story = {};
