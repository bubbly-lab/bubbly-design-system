import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchField } from './search-field';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: {
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
    clearLabel: { control: 'text' },
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
  render: args => {
    const ControlledExample = () => {
      const [value, setValue] = useState('제주');
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
            onChange={e => setValue(e.target.value)}
            onClear={() => setValue('')}
          />
          <div style={{ color: '#999', fontSize: '12px' }}>
            value: <code>{JSON.stringify(value)}</code>
          </div>
        </div>
      );
    };
    return <ControlledExample />;
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
