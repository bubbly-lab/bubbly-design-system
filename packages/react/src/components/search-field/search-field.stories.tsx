import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { SearchField, type SearchFieldProps } from './search-field';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=3004-1001',
    },
    backgrounds: {
      options: {
        darker: { name: 'Darker', value: 'rgb(0 0 0)' },
      },
    },
  },
  globals: {
    backgrounds: { value: 'darker' },
  },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    clearLabel: {
      control: 'text',
      description:
        'aria-label for the clear button. Defaults to "Clear search".',
    },
  },
  args: {
    placeholder: '테마명 혹은 카페명 검색',
  },
  render: args => (
    <div style={{ width: '360px', fontFamily: 'var(--fonts-sans)' }}>
      <SearchField {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof SearchField>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValue: '제주 카페',
  },
};

export const Controlled: Story = {
  args: {
    value: '제주',
  },
  argTypes: {
    value: { control: 'text' },
  },
  render: function Controlled(args) {
    const [{ value }, updateArgs] = useArgs<SearchFieldProps>();
    return (
      <div
        style={{
          width: '360px',
          fontFamily: 'var(--fonts-sans)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <SearchField
          {...args}
          value={value}
          onChange={e => updateArgs({ value: e.target.value })}
          onClear={() => updateArgs({ value: '' })}
        />
        <div style={{ color: '#999', fontSize: '12px' }}>
          value: <code>{JSON.stringify(value)}</code>
        </div>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: 'uncontrolled value',
  },
};

export const CustomWidth: Story = {
  render: args => (
    <div style={{ fontFamily: 'var(--fonts-sans)' }}>
      <SearchField {...args} style={{ width: '240px' }} />
    </div>
  ),
};

export const Overflow: Story = {
  args: {
    defaultValue:
      '입력 text가 가로로 넘치면 우측 방향으로 text 노출이 계속되며, active/focus 상태일 때 cursor와 함께 계속 노출됩니다.',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '검색 비활성',
    disabled: true,
  },
};

// Hover/active state preview via the pseudo-states addon. (The focus ring is
// driven by the `data-keyboard-focus` attribute set on real keyboard focus, so
// it is exercised in the Controlled story rather than forced here.)
export const InteractiveStates: Story = {
  parameters: {
    pseudo: {
      hover: ['#sf-hover'],
      active: ['#sf-active'],
    },
  },
  render: () => (
    <div
      style={{
        width: '360px',
        fontFamily: 'var(--fonts-sans)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <SearchField placeholder="default" />
      {/* biome-ignore lint/correctness/useUniqueElementIds: pseudo-states addon selector target */}
      <div id="sf-hover">
        <SearchField placeholder="hover" />
      </div>
      {/* biome-ignore lint/correctness/useUniqueElementIds: pseudo-states addon selector target */}
      <div id="sf-active">
        <SearchField placeholder="active" />
      </div>
      <SearchField placeholder="disabled" disabled />
    </div>
  ),
};
