import type { Meta, StoryObj } from '@storybook/react';
import { IconClose } from '../icons/IconClose';

const meta: Meta<typeof IconClose> = {
  title: 'Icons/IconClose',
  component: IconClose,
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

type Story = StoryObj<typeof IconClose>;

export const Default: Story = {};
