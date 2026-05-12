import type { Meta, StoryObj } from '@storybook/react';
import { TabItem, TabItemContent, TabList, Tabs } from '.';
import type { TabsProps } from './tabs';

const scrollableTabs = [
  'Overview',
  'Details',
  'Activity',
  'Members',
  'Settings',
  'Archive',
  'More',
];

const fixedTabs = ['Overview', 'Details', 'Activity', 'Members', 'Settings'];

const renderTabs = (tabs: string[], args: TabsProps) => (
  <div style={{ width: '607px', fontFamily: 'var(--fonts-sans)' }}>
    <Tabs {...args}>
      <TabList>
        {tabs.map(tab => {
          const value = tab.toLowerCase();

          return <TabItem key={value} value={value} label={tab} />;
        })}
      </TabList>

      {tabs.map(tab => {
        const value = tab.toLowerCase();

        return (
          <TabItemContent key={value} value={value}>
            {tab} panel
          </TabItemContent>
        );
      })}
    </Tabs>
  </div>
);

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
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Scrollable: Story = {
  render: args => renderTabs(scrollableTabs, args),
};

export const Fixed: Story = {
  args: {
    layout: 'fixed',
  },

  render: args => renderTabs(fixedTabs, args),
};
