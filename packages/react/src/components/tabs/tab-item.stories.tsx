import type { Meta, StoryObj } from '@storybook/react';

import { TabItem, TabItemContent, TabList, Tabs } from '.';
import type { TabItemProps } from './tabs';

interface TabItemStoryArgs extends Omit<TabItemProps, 'children'> {
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
  render: ({ label, selected }: TabItemStoryArgs) => {
    return (
      <div style={{ fontFamily: 'var(--fonts-sans)', width: 'fit-content' }}>
        <Tabs
          defaultValue={selected ? 'overview' : undefined}
          layout="scrollable"
          padded={false}
          style={{ width: 'fit-content' }}
        >
          <TabList
            style={{
              width: 'fit-content',
              background: 'transparent',
              borderBottom: 'none',
              paddingInline: 0,
              overflow: 'visible',
            }}
          >
            <TabItem label={label} value="overview" />
          </TabList>
          <TabItemContent value="overview">Preview panel</TabItemContent>
        </Tabs>
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
