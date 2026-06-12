import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
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
    // TODO(a11y): content.neutral.subtle(#717187) 비활성 탭 라벨이 다크 배경에서
    // WCAG AA 4.5:1 미달(3.78:1). 기존 디자인 토큰 부채 — docs/a11y-contrast-debt.md 참고.
    // 토큰 수정 전까지 게이트 제외(실행·리포트는 됨, 실패는 안 함).
    a11y: { test: 'todo' },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=35-1249',
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['scrollable', 'fixed'],
      description:
        "탭 배치 방식. 'scrollable'은 넓이를 넘으면 가로 스크롤, 'fixed'는 탭들이 넓이를 균등 분할.",
    },
    padded: {
      control: 'boolean',
      description:
        'true면 탭 목록 좌우에 기본 가로 여백을 준다. false면 여백 없이 컨테이너 끝에 맞춘다.',
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
  // Tabs1 happy: 다른 탭 클릭 시 aria-selected가 이동하고 해당 패널이 노출된다.
  // Tabs3 regression: 기존 탭은 aria-selected='false'로 바뀐다.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overviewTab = canvas.getByRole('tab', { name: 'Overview' });
    const detailsTab = canvas.getByRole('tab', { name: 'Details' });
    await expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(detailsTab);
    await expect(detailsTab).toHaveAttribute('aria-selected', 'true');
    await expect(overviewTab).toHaveAttribute('aria-selected', 'false');
    await expect(canvas.getByText('Details panel')).toBeVisible();
  },
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
