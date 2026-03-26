import type { Meta, StoryObj } from '@storybook/react';
import { IconMenu } from '../icons/IconMenu';

const meta: Meta<typeof IconMenu> = {
  title: 'Icons/IconMenu',
  component: IconMenu,
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

type Story = StoryObj<typeof IconMenu>;

export const Default: Story = {};
