import type { Meta, StoryObj } from '@storybook/react';

import { LoadingIndicator } from './loading-indicator';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=433-910',
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['content.neutral.default', 'content.brand.default'],
      description:
        '스피너 색상 시맨틱 토큰. 부모(Button 등)의 currentColor도 상속한다.',
    },
  },
  args: {
    color: 'content.brand.default',
  },
};

export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {};

// 크기는 width/height를 각 인스턴스에 리터럴로 직접 적는다. 숫자 토큰 키(예: "40")는
// sizes(= dimension) 토큰으로 해석된다. panda 정적 추출은 JSX의 리터럴만 읽으므로,
// 헬퍼/변수로 감싸면(width={size}) CSS가 생성되지 않아 기본값으로 폴백한다.
const SIZE_LABEL_STYLE = {
  color: '#999',
  fontSize: '12px',
  fontFamily: 'var(--fonts-sans)',
} as const;

const SIZE_SAMPLE_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
} as const;

export const CustomSizes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={SIZE_SAMPLE_STYLE}>
        <LoadingIndicator {...args} width="16" height="16" />
        <span style={SIZE_LABEL_STYLE}>16px</span>
      </div>
      <div style={SIZE_SAMPLE_STYLE}>
        <LoadingIndicator {...args} width="24" height="24" />
        <span style={SIZE_LABEL_STYLE}>24px</span>
      </div>
      <div style={SIZE_SAMPLE_STYLE}>
        <LoadingIndicator {...args} width="40" height="40" />
        <span style={SIZE_LABEL_STYLE}>40px</span>
      </div>
      <div style={SIZE_SAMPLE_STYLE}>
        <LoadingIndicator {...args} width="64" height="64" />
        <span style={SIZE_LABEL_STYLE}>64px</span>
      </div>
    </div>
  ),
};
