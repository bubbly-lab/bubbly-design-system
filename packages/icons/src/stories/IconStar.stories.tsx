import type { Meta, StoryObj } from '@storybook/react';
import { IconStar } from '../icons/IconStar';

const meta: Meta<typeof IconStar> = {
  title: 'Icons/IconStar',
  component: IconStar,
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

type Story = StoryObj<typeof IconStar>;

export const Default: Story = {};
