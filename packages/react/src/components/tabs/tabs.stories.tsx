import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '.';
import type { TabsRootProps } from './tabs';

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
          <Tabs.Item value="overview" label="Overview" />
          <Tabs.Item value="details" label="Details" />
          <Tabs.Item value="activity" label="Activity" />
          <Tabs.Item value="members" label="Members" />
          <Tabs.Item value="settings" label="Settings" />
          <Tabs.Item value="archive" label="Archive" />
          <Tabs.Item value="more" label="More" />
        </Tabs.List>
        <Tabs.ItemContent value="overview">Overview panel</Tabs.ItemContent>
        <Tabs.ItemContent value="details">Details panel</Tabs.ItemContent>
        <Tabs.ItemContent value="activity">Activity panel</Tabs.ItemContent>
        <Tabs.ItemContent value="members">Members panel</Tabs.ItemContent>
        <Tabs.ItemContent value="settings">Settings panel</Tabs.ItemContent>
        <Tabs.ItemContent value="archive">Archive panel</Tabs.ItemContent>
        <Tabs.ItemContent value="more">More panel</Tabs.ItemContent>
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
          <Tabs.Item value="overview" label="Overview" />
          <Tabs.Item value="details" label="Details" />
          <Tabs.Item value="activity" label="Activity" />
          <Tabs.Item value="members" label="Members" />
          <Tabs.Item value="settings" label="Settings" />
        </Tabs.List>
        <Tabs.ItemContent value="overview">Overview panel</Tabs.ItemContent>
        <Tabs.ItemContent value="details">Details panel</Tabs.ItemContent>
        <Tabs.ItemContent value="activity">Activity panel</Tabs.ItemContent>
        <Tabs.ItemContent value="members">Members panel</Tabs.ItemContent>
        <Tabs.ItemContent value="settings">Settings panel</Tabs.ItemContent>
      </Tabs.Root>
    </div>
  ),
};
