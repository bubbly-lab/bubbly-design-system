import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=2742-854',
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['stroke', 'surface'],
      description:
        "구분선 스타일. 'stroke'는 연한 선, 'surface'는 배경면 색상의 더 두껍고 은은한 구분면.",
    },
  },
  args: {
    type: 'stroke',
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Stroke: Story = {
  render: args => (
    <div style={{ width: '320px' }}>
      <Divider {...args} />
    </div>
  ),
};

export const Surface: Story = {
  args: {
    type: 'surface',
  },
  render: args => (
    <div style={{ width: '320px' }}>
      <Divider {...args} />
    </div>
  ),
};

// Realistic placement: a divider separating content blocks, which is how it is
// actually used. The Stroke/Surface stories show the bare variants in isolation.
export const InContext: Story = {
  render: () => (
    <div
      style={{
        width: '320px',
        fontFamily: 'var(--fonts-sans)',
        color: 'var(--colors-content-neutral-strong)',
      }}
    >
      <div style={{ padding: '12px 0' }}>첫 번째 섹션</div>
      <Divider type="stroke" />
      <div style={{ padding: '12px 0' }}>두 번째 섹션</div>
      <Divider type="surface" />
      <div style={{ padding: '12px 0' }}>세 번째 섹션</div>
    </div>
  ),
};
