import { IconLocation, IconTime } from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { InfoItem } from './info-item';

const meta: Meta<typeof InfoItem> = {
  title: 'Components/InfoItem',
  component: InfoItem,
  argTypes: {
    label: { control: 'text' },
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
