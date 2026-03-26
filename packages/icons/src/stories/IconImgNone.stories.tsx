import type { Meta, StoryObj } from '@storybook/react';
import { IconImgNone } from '../icons/IconImgNone';

const meta: Meta<typeof IconImgNone> = {
  title: 'Icons/IconImgNone',
  component: IconImgNone,
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

type Story = StoryObj<typeof IconImgNone>;

export const Default: Story = {};
