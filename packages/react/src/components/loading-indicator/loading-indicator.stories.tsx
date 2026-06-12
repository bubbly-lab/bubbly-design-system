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
        '스피너 색상 시맨틱 토큰. 크기는 별도 prop이 없으며 style/fontSize로 조절한다(em 기반).',
    },
  },
  args: {
    color: 'content.brand.default',
  },
};

export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {};

export const CustomSizes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {[16, 24, 40, 64].map(size => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <LoadingIndicator
            {...args}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
          <span
            style={{
              color: '#999',
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
            }}
          >
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
};
