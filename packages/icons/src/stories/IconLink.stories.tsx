import type { Meta, StoryObj } from '@storybook/react';
import { IconLink } from '../icons/IconLink';

const meta: Meta<typeof IconLink> = {
  title: 'Icons/IconLink',
  component: IconLink,
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

type Story = StoryObj<typeof IconLink>;

export const Default: Story = {};
