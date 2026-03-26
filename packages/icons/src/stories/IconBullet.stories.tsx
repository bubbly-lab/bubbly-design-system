import type { Meta, StoryObj } from '@storybook/react';
import { IconBullet } from '../icons/IconBullet';

const meta: Meta<typeof IconBullet> = {
  title: 'Icons/IconBullet',
  component: IconBullet,
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

type Story = StoryObj<typeof IconBullet>;

export const Default: Story = {};
