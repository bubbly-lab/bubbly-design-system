import type { Meta, StoryObj } from '@storybook/react';
import { IconReload } from '../icons/IconReload';

const meta: Meta<typeof IconReload> = {
  title: 'Icons/IconReload',
  component: IconReload,
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

type Story = StoryObj<typeof IconReload>;

export const Default: Story = {};
