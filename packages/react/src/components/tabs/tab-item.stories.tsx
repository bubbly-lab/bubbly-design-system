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
        <Tabs.Root
          defaultValue={selected ? 'overview' : undefined}
          layout="scrollable"
          padding={false}
          style={{ width: 'fit-content' }}
        >
          <Tabs.List
            style={{
              width: 'fit-content',
              background: 'transparent',
              borderBottom: 'none',
              paddingInline: 0,
              overflow: 'visible',
            }}
          >
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
