import type { Meta, StoryObj } from '@storybook/react';
import { IconArrowLeft } from '../icons/IconArrowLeft';

const meta: Meta<typeof IconArrowLeft> = {
  title: 'Icons/IconArrowLeft',
  component: IconArrowLeft,
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

type Story = StoryObj<typeof IconArrowLeft>;

export const Default: Story = {};
