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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=35-1249',
    },
  },
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

export const Padded: Story = {
  name: 'Padded = false',
  args: {
    padded: false,
  },
  render: args => renderTabs(fixedTabs, args),
};

// Auto-composition: when every child is a <TabItem>, <Tabs> generates the
// TabList + content panels automatically. This is the simplest consumer API.
export const AutoComposed: Story = {
  render: args => (
    <div style={{ width: '607px', fontFamily: 'var(--fonts-sans)' }}>
      <Tabs {...args}>
        <TabItem value="overview" label="Overview">
          Overview panel
        </TabItem>
        <TabItem value="details" label="Details">
          Details panel
        </TabItem>
        <TabItem value="activity" label="Activity">
          Activity panel
        </TabItem>
      </Tabs>
    </div>
  ),
};

// Hover/focus preview for tab triggers via the pseudo-states addon, so
// designers can review trigger states against Figma without hovering.
export const InteractiveStates: Story = {
  parameters: {
    pseudo: {
      hover: ['#tabs-hover'],
      focusVisible: ['#tabs-focus'],
    },
  },
  render: args => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      <div>
        <div style={{ marginBottom: '8px', color: '#999', fontSize: '12px' }}>
          hover
        </div>
        {/* biome-ignore lint/correctness/useUniqueElementIds: pseudo-states addon selector target */}
        <div id="tabs-hover">{renderTabs(fixedTabs, args)}</div>
      </div>
      <div>
        <div style={{ marginBottom: '8px', color: '#999', fontSize: '12px' }}>
          focus
        </div>
        {/* biome-ignore lint/correctness/useUniqueElementIds: pseudo-states addon selector target */}
        <div id="tabs-focus">{renderTabs(fixedTabs, args)}</div>
      </div>
    </div>
  ),
};
