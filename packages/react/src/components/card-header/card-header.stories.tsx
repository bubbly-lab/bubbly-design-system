import type { Meta, StoryObj } from '@storybook/react';
import { cardHeader } from 'styled-system/recipes';

import { CardHeader } from './card-header';

const { variantMap } = cardHeader;

const meta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader',
  component: CardHeader,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=2769-8392',
    },
  },
  argTypes: {
    captionPosition: {
      control: 'select',
      options: variantMap.captionPosition,
      description:
        "caption 위치. 'top'은 제목 위, 'bottom'은 제목 아래, 'none'은 caption을 렌더링하지 않음.",
    },
    hasBottom: {
      control: 'boolean',
      description:
        'false면 metadata 하단 영역을 숨긴다(metadata가 있어도 미표시).',
    },
  },
  args: {
    caption: 'Caption',
    title: 'Title',
    metadata: ['iOS', 'Finance', '8 min read'],
  },
};

export default meta;
type Story = StoryObj<typeof CardHeader>;

export const Default: Story = {};

export const CaptionBottom: Story = {
  args: {
    captionPosition: 'bottom',
  },
};

export const CaptionNone: Story = {
  args: {
    captionPosition: 'none',
    caption: undefined,
  },
};

export const WithoutBottom: Story = {
  args: {
    hasBottom: false,
  },
};

export const LongTitle: Story = {
  args: {
    caption:
      '아주 길어서 두 줄을 넘어가면 말줄임표로 잘려야 하는 캡션 텍스트입니다',
    title:
      '아주 길어서 두 줄까지 늘어난 뒤 말줄임표로 잘려야 하는 카드 제목 텍스트 예시입니다',
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {variantMap.captionPosition.map(captionPosition => (
        <CardHeader
          key={captionPosition}
          caption={captionPosition === 'none' ? undefined : 'Caption'}
          captionPosition={captionPosition}
          title="Title"
          metadata={['iOS', 'Finance', '8 min read']}
        />
      ))}
      <CardHeader
        caption="Caption"
        title="Title"
        hasBottom={false}
        metadata={['iOS', 'Finance', '8 min read']}
      />
    </div>
  ),
};
