import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '.';
import type { TabsRootProps } from './tab';

const meta: Meta<typeof Tabs.Root> = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  argTypes: {
    layout: {
      control: 'select',
      options: ['scrollable', 'fixed'],
    },
    padding: {
      control: 'boolean',
    },
  },
  args: {
    defaultValue: 'overview',
    layout: 'scrollable',
    padding: true,
  },
  render: (args: TabsRootProps) => (
    <div style={{ width: '607px', fontFamily: 'var(--fonts-sans)' }}>
      <Tabs.Root {...args}>
        <Tabs.List>
          <Tabs.TabItem value="overview" label="Overview" />
          <Tabs.TabItem value="details" label="Details" />
          <Tabs.TabItem value="activity" label="Activity" />
          <Tabs.TabItem value="members" label="Members" />
          <Tabs.TabItem value="settings" label="Settings" />
          <Tabs.TabItem value="archive" label="Archive" />
          <Tabs.TabItem value="more" label="More" />
        </Tabs.List>
        <Tabs.TabItemContent value="overview">
          Overview panel
        </Tabs.TabItemContent>
        <Tabs.TabItemContent value="details">Details panel</Tabs.TabItemContent>
        <Tabs.TabItemContent value="activity">
          Activity panel
        </Tabs.TabItemContent>
        <Tabs.TabItemContent value="members">Members panel</Tabs.TabItemContent>
        <Tabs.TabItemContent value="settings">
          Settings panel
        </Tabs.TabItemContent>
        <Tabs.TabItemContent value="archive">Archive panel</Tabs.TabItemContent>
        <Tabs.TabItemContent value="more">More panel</Tabs.TabItemContent>
      </Tabs.Root>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Tabs.Root>;

export const Scrollable: Story = {};

export const Fixed: Story = {
  args: {
    layout: 'fixed',
  },
  render: (args: TabsRootProps) => (
    <div style={{ width: '607px', fontFamily: 'var(--fonts-sans)' }}>
      <Tabs.Root {...args}>
        <Tabs.List>
          <Tabs.TabItem value="overview" label="Overview" />
          <Tabs.TabItem value="details" label="Details" />
          <Tabs.TabItem value="activity" label="Activity" />
          <Tabs.TabItem value="members" label="Members" />
          <Tabs.TabItem value="settings" label="Settings" />
        </Tabs.List>
        <Tabs.TabItemContent value="overview">
          Overview panel
        </Tabs.TabItemContent>
        <Tabs.TabItemContent value="details">Details panel</Tabs.TabItemContent>
        <Tabs.TabItemContent value="activity">
          Activity panel
        </Tabs.TabItemContent>
        <Tabs.TabItemContent value="members">Members panel</Tabs.TabItemContent>
        <Tabs.TabItemContent value="settings">
          Settings panel
        </Tabs.TabItemContent>
      </Tabs.Root>
    </div>
  ),
};
