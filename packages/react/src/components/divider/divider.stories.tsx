import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  argTypes: {
    type: {
      control: "select",
      options: ["stroke", "surface"],
    },
  },
  args: {
    type: "stroke",
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Stroke: Story = {
  render: (args) => (
    <div style={{ width: "320px" }}>
      <Divider {...args} />
    </div>
  ),
};

export const Surface: Story = {
  args: {
    type: "surface",
  },
  render: (args) => (
    <div style={{ width: "320px" }}>
      <Divider {...args} />
    </div>
  ),
};
