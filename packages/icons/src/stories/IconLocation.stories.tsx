import type { Meta, StoryObj } from '@storybook/react';
import { IconLocation } from '../icons/IconLocation';

const meta: Meta<typeof IconLocation> = {
  title: 'Icons/IconLocation',
  component: IconLocation,
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

type Story = StoryObj<typeof IconLocation>;

export const Default: Story = {};
