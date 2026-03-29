import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from ".";
import type { TabItemProps } from "./tab";

interface TabItemStoryArgs extends Omit<TabItemProps, "children"> {
  selected: boolean;
}

const meta = {
  title: "Components/Tabs/TabItem",
  argTypes: {
    selected: {
      control: "boolean",
    },
  },
  args: {
    value: "overview",
    label: "Overview",
    selected: true,
  },
  render: ({ label, selected }: TabItemStoryArgs) => {
    return (
      <div style={{ fontFamily: "var(--fonts-sans)", width: "fit-content" }}>
        <style>{`
          .tabs__root {
            width: fit-content;
          }

          .tabs__list {
            width: fit-content;
            background: transparent;
            border-bottom: none;
            padding-inline: 0;
            overflow: visible;
          }
        `}</style>
        <Tabs.Root
          defaultValue={selected ? "overview" : undefined}
          layout="scrollable"
          padding={false}
        >
          <Tabs.List>
            <Tabs.TabItem label={label} value="overview" />
          </Tabs.List>
          <Tabs.TabItemContent value="overview">
            Preview panel
          </Tabs.TabItemContent>
        </Tabs.Root>
      </div>
    );
  },
} satisfies Meta<TabItemStoryArgs>;

export default meta;

type Story = StoryObj<TabItemStoryArgs>;

export const Selected: Story = {};

export const Unselected: Story = {
  args: {
    selected: false,
  },
};
