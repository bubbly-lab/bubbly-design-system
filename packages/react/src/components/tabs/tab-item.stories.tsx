import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '.';
import type { ItemProps } from './tabs';

interface ItemStoryArgs extends Omit<ItemProps, 'children'> {
  selected: boolean;
}

const meta = {
  title: 'Components/Tabs/Item',
  argTypes: {
    selected: {
      control: 'boolean',
    },
  },
  args: {
    value: 'overview',
    label: 'Overview',
    selected: true,
  },
  render: ({ label, selected }: ItemStoryArgs) => {
    return (
      <div style={{ fontFamily: 'var(--fonts-sans)', width: 'fit-content' }}>
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
          defaultValue={selected ? 'overview' : undefined}
          layout="scrollable"
          padding={false}
        >
          <Tabs.List>
            <Tabs.Item label={label} value="overview" />
          </Tabs.List>
          <Tabs.ItemContent value="overview">Preview panel</Tabs.ItemContent>
        </Tabs.Root>
      </div>
    );
  },
} satisfies Meta<ItemStoryArgs>;

export default meta;

type Story = StoryObj<ItemStoryArgs>;

export const Selected: Story = {};

export const Unselected: Story = {
  args: {
    selected: false,
  },
};
