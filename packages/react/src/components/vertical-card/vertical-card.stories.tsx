import type { Meta, StoryObj } from '@storybook/react';
import { cardHeader, thumbnail } from 'styled-system/recipes';
import { CardHeader } from '../card-header';
import { Thumbnail } from '../thumbnail';
import { VerticalCard } from './vertical-card';

const { variantMap: thumbnailVariants } = thumbnail;
const { variantMap: cardHeaderVariants } = cardHeader;

const DEMO_IMG = 'https://picsum.photos/seed/bubbly-vcard/300/400';

const meta: Meta = {
  title: 'Components/VerticalCard',
  component: VerticalCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=2769-8392',
    },
  },
  argTypes: {
    zoomed: {
      control: 'boolean',
      description:
        '카드 hover 시 썸네일 이미지를 확대하는 zoom 인터랙션 활성화 (group hover 기반).',
    },
    ratio: {
      control: 'select',
      options: thumbnailVariants.ratio,
      description: '썸네일 이미지의 가로세로 비율.',
    },
    radius: {
      control: 'select',
      options: thumbnailVariants.radius,
      description: '썸네일 모서리 둘근 정도.',
    },
    bordered: {
      control: 'boolean',
      description: '썸네일에 1px 테두리를 그린다(밝은 이미지 경계 대비).',
    },
    loading: {
      control: 'boolean',
      description: 'true면 썸네일을 스켈레톤 로딩 상태로 표시.',
    },
    src: { control: 'text' },
    cardTitle: { control: 'text' },
    caption: { control: 'text' },
    captionPosition: {
      control: 'select',
      options: cardHeaderVariants.captionPosition,
      description: 'caption을 제목 위/아래 어디에 둘지 결정.',
    },
    hasBottom: {
      control: 'boolean',
      description: 'false면 metadata 등 하단 영역을 렌더링하지 않는다.',
    },
  },
  args: {
    style: { width: '200px' },
    zoomed: true,
    ratio: '3:4',
    radius: '8px',
    bordered: false,
    loading: false,
    src: DEMO_IMG,
    cardTitle: 'Title',
    caption: 'Caption',
    hasBottom: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({
    zoomed,
    ratio,
    radius,
    bordered,
    loading,
    src,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
    ...args
  }) => (
    <VerticalCard {...args}>
      <Thumbnail
        src={loading ? undefined : src}
        alt="Demo"
        ratio={ratio}
        radius={radius}
        zoomed={zoomed}
        bordered={bordered}
        loading={loading}
      />
      <CardHeader
        caption={caption}
        captionPosition={captionPosition}
        title={cardTitle}
        hasBottom={hasBottom}
        metadata={['iOS', 'Finance', '8 min read']}
      />
    </VerticalCard>
  ),
};

export const Placeholder: Story = {
  args: { loading: false },
  render: ({
    ratio,
    radius,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
    ...args
  }) => (
    <VerticalCard {...args}>
      <Thumbnail alt="No image" ratio={ratio} radius={radius} />
      <CardHeader
        caption={caption}
        captionPosition={captionPosition}
        title={cardTitle}
        hasBottom={hasBottom}
      />
    </VerticalCard>
  ),
};

export const Loading: Story = {
  args: { loading: true },
  render: ({ ratio, radius, cardTitle, caption, ...args }) => (
    <VerticalCard {...args}>
      <Thumbnail loading ratio={ratio} radius={radius} />
      <CardHeader caption={caption} title={cardTitle} />
    </VerticalCard>
  ),
};

export const FillsParent: Story = {
  args: { style: undefined },
  render: ({
    zoomed,
    ratio,
    radius,
    bordered,
    loading,
    src,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
    ...args
  }) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {['160px', '200px', '280px'].map(width => (
        <div key={width} style={{ width }}>
          <VerticalCard {...args}>
            <Thumbnail
              src={loading ? undefined : src}
              alt={width}
              ratio={ratio}
              radius={radius}
              zoomed={zoomed}
              bordered={bordered}
              loading={loading}
            />
            <CardHeader
              caption={width}
              captionPosition={captionPosition}
              title={cardTitle}
              hasBottom={hasBottom}
            />
          </VerticalCard>
        </div>
      ))}
    </div>
  ),
};
