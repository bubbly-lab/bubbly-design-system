import { IconLocation, IconTime } from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { InfoItem } from './info-item';

const meta: Meta<typeof InfoItem> = {
  title: 'Components/InfoItem',
  component: InfoItem,
  // InfoItem은 색을 InfoList의 color prop에서 상속(color: inherit)하도록 설계됨.
  // standalone 스토리에는 InfoList 부모가 없으므로, 실제 사용 맥락(neutral)을
  // 재현하도록 기본 텍스트 색 컨텍스트를 제공한다(미제공 시 검정으로 떨어져 대비 미달).
  decorators: [
    Story => (
      <div
        style={{
          color: 'var(--colors-content-neutral-default)',
          fontFamily: 'var(--fonts-sans)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=3156-6303',
    },
  },
  argTypes: {
    label: { control: 'text' },
    prefixIcon: {
      description:
        '레이블 앞에 놓이는 아이콘. aria-hidden 래퍼로 감싸져 장식용으로만 노출된다.',
    },
  },
  args: {
    label: '서울 강남구',
  },
};

export default meta;
type Story = StoryObj<typeof InfoItem>;

export const Default: Story = {};

export const WithPrefixIcon: Story = {
  args: {
    prefixIcon: <IconLocation />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        color: 'var(--colors-content-neutral-default)',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      <InfoItem label="서울 강남구" />
      <InfoItem prefixIcon={<IconLocation />} label="서울 강남구" />
      <InfoItem prefixIcon={<IconTime />} label="오전 11시 ~ 오후 10시" />
    </div>
  ),
};

export const LongLabel: Story = {
  args: {
    prefixIcon: <IconLocation />,
    label:
      '서울특별시 강남구 테헤란로 123길 45, 어느 건물 10층 1001호 (좁은 컨테이너에서 ellipsis 확인)',
    style: { maxWidth: '240px' },
  },
};
