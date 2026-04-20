import type { Meta, StoryObj } from '@storybook/react';
import { TabItem, TabItemContent, TabList, Tabs } from '.';
import type { TabsProps } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    layout: {
      control: 'select',
      options: ['scrollable', 'fixed'],
    },
    padded: {
      control: 'boolean',
    },
  },
  args: {
    defaultValue: 'overview',
    layout: 'scrollable',
    padded: true,
  },
  render: (args: TabsProps) => (
    <div style={{ width: '607px', fontFamily: 'var(--fonts-sans)' }}>
      <Tabs {...args}>
        <TabList>
          <TabItem value="overview" label="Overview" />
          <TabItem value="details" label="Details" />
          <TabItem value="activity" label="Activity" />
          <TabItem value="members" label="Members" />
          <TabItem value="settings" label="Settings" />
          <TabItem value="archive" label="Archive" />
          <TabItem value="more" label="More" />
        </TabList>
        <TabItemContent value="overview">Overview panel</TabItemContent>
        <TabItemContent value="details">Details panel</TabItemContent>
        <TabItemContent value="activity">Activity panel</TabItemContent>
        <TabItemContent value="members">Members panel</TabItemContent>
        <TabItemContent value="settings">Settings panel</TabItemContent>
        <TabItemContent value="archive">Archive panel</TabItemContent>
        <TabItemContent value="more">More panel</TabItemContent>
      </Tabs>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Scrollable: Story = {};

export const Fixed: Story = {
  args: {
    layout: 'fixed',
  },
  render: (args: TabsProps) => (
    <div style={{ width: '607px', fontFamily: 'var(--fonts-sans)' }}>
      <Tabs {...args}>
        <TabList>
          <TabItem value="overview" label="Overview" />
          <TabItem value="details" label="Details" />
          <TabItem value="activity" label="Activity" />
          <TabItem value="members" label="Members" />
          <TabItem value="settings" label="Settings" />
        </TabList>
        <TabItemContent value="overview">Overview panel</TabItemContent>
        <TabItemContent value="details">Details panel</TabItemContent>
        <TabItemContent value="activity">Activity panel</TabItemContent>
        <TabItemContent value="members">Members panel</TabItemContent>
        <TabItemContent value="settings">Settings panel</TabItemContent>
      </Tabs>
    </div>
  ),
};
