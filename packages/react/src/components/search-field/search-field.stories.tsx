import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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
        <div
          style={{
            color: 'var(--colors-content-neutral-strong)',
            fontSize: '12px',
          }}
        >
          value: <code>{JSON.stringify(value)}</code>
        </div>
      </div>
    );
  },
  // SF1 happy: controlled value가 input에 반영되고 clear 버튼이 노출된다.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');
    await expect(input).toHaveValue('제주');
    await expect(
      canvas.getByRole('button', { name: 'Clear search' }),
    ).toBeInTheDocument();
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: 'uncontrolled value',
  },
  // SF2 edge: uncontrolled 입력에 타이핑 시 value가 누적되고,
  // SF3 regression: clear 버튼 클릭 시 비워지며 clear 버튼이 사라진다.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');
    await expect(input).toHaveValue('uncontrolled value');
    await userEvent.click(canvas.getByRole('button', { name: 'Clear search' }));
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
    await userEvent.type(input, '제주', { delay: 1 });
    await waitFor(() => {
      expect(input).toHaveValue('제주');
    });
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
