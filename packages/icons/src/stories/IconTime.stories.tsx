import type { Meta, StoryObj } from '@storybook/react';
import { IconTime } from '../icons/IconTime';

const meta: Meta<typeof IconTime> = {
  title: 'Icons/IconTime',
  component: IconTime,
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

type Story = StoryObj<typeof IconTime>;

export const Default: Story = {};
