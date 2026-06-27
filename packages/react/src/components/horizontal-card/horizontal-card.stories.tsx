import type { Meta, StoryObj } from '@storybook/react';
import { cardHeader, horizontalCard } from 'styled-system/recipes';
import { CardHeader } from '../card-header';
import { Thumbnail } from '../thumbnail';
import { HorizontalCard } from './horizontal-card';

const { variantMap } = horizontalCard;
const { variantMap: cardHeaderVariants } = cardHeader;

const DEMO_IMG =
  'https://cdn.rumyscape.com/uploads/deepthinker_ongyi_dream_ade35e4e8f.jpg';

const meta: Meta = {
  title: 'Components/HorizontalCard',
  component: HorizontalCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=2769-8392',
    },
  },
  argTypes: {
    size: { control: 'select', options: variantMap.size },
    zoomed: {
      control: 'boolean',
      description:
        '카드 hover 시 썸네일 이미지를 확대하는 zoom 인터랙션 활성화 (group hover 기반).',
    },
    hasBorder: {
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
    style: { width: '308px' },
    size: 'small',
    zoomed: true,
    hasBorder: false,
    loading: false,
    src: DEMO_IMG,
    cardTitle: 'Title',
    caption: 'caption',
    hasBottom: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({
    size,
    zoomed,
    hasBorder,
    loading,
    src,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
    ...args
  }) => (
    <HorizontalCard size={size} {...args}>
      <Thumbnail
        src={loading ? undefined : src}
        alt="Demo"
        ratio="1:1"
        radius="full"
        zoomed={zoomed}
        hasBorder={hasBorder}
        loading={loading}
      />
      <CardHeader
        caption={caption}
        captionPosition={captionPosition}
        title={cardTitle}
        hasBottom={hasBottom}
        metadata={['Label', 'Label', 'Label']}
      />
    </HorizontalCard>
  ),
};

export const AllSizes: Story = {
  render: ({
    zoomed,
    hasBorder,
    loading,
    src,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
  }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {variantMap.size.map(size => (
        <div key={size} style={{ width: '308px' }}>
          <HorizontalCard size={size}>
            <Thumbnail
              src={loading ? undefined : src}
              alt={`${size} demo`}
              ratio="1:1"
              radius="full"
              zoomed={zoomed}
              hasBorder={hasBorder}
              loading={loading}
            />
            <CardHeader
              caption={`${caption} (${size})`}
              captionPosition={captionPosition}
              title={cardTitle}
              hasBottom={hasBottom}
              metadata={['Label', 'Label', 'Label']}
            />
          </HorizontalCard>
        </div>
      ))}
    </div>
  ),
};

export const FillsParent: Story = {
  args: { style: undefined },
  render: ({
    size,
    zoomed,
    hasBorder,
    loading,
    src,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
    ...args
  }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {['200px', '308px', '400px'].map(width => (
        <div key={width} style={{ width }}>
          <HorizontalCard size={size} {...args}>
            <Thumbnail
              src={loading ? undefined : src}
              alt={width}
              ratio="1:1"
              radius="full"
              zoomed={zoomed}
              hasBorder={hasBorder}
              loading={loading}
            />
            <CardHeader
              caption={width}
              captionPosition={captionPosition}
              title={cardTitle}
              hasBottom={hasBottom}
              metadata={['Label', 'Label', 'Label']}
            />
          </HorizontalCard>
        </div>
      ))}
    </div>
  ),
};

export const LongText: Story = {
  args: {
    cardTitle:
      'This is a very long title text that should also be truncated with ellipsis overflow',
    caption:
      'This is a very long caption that should be truncated with ellipsis',
  },
  render: ({
    size,
    zoomed,
    hasBorder,
    loading,
    src,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
    ...args
  }) => (
    <HorizontalCard size={size} {...args}>
      <Thumbnail
        src={loading ? undefined : src}
        alt="Long text demo"
        ratio="1:1"
        radius="full"
        zoomed={zoomed}
        hasBorder={hasBorder}
        loading={loading}
      />
      <CardHeader
        caption={caption}
        captionPosition={captionPosition}
        title={cardTitle}
        hasBottom={hasBottom}
        metadata={['Very Long Label', 'Another Long Label', 'Third Label']}
      />
    </HorizontalCard>
  ),
};

export const NarrowContainer: Story = {
  args: { style: undefined },
  render: ({
    zoomed,
    hasBorder,
    loading,
    src,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
  }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {variantMap.size.map(size => (
        <div key={size} style={{ width: '140px' }}>
          <HorizontalCard size={size}>
            <Thumbnail
              src={loading ? undefined : src}
              alt="Narrow"
              ratio="1:1"
              radius="full"
              zoomed={zoomed}
              hasBorder={hasBorder}
              loading={loading}
            />
            <CardHeader
              caption={caption}
              captionPosition={captionPosition}
              title={cardTitle}
              hasBottom={hasBottom}
            />
          </HorizontalCard>
        </div>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true },
  render: ({ size, cardTitle, caption, ...args }) => (
    <HorizontalCard size={size} {...args}>
      <Thumbnail loading ratio="1:1" radius="full" />
      <CardHeader caption={caption} title={cardTitle} />
    </HorizontalCard>
  ),
};

export const Placeholder: Story = {
  args: { loading: false },
  render: ({
    size,
    cardTitle,
    caption,
    captionPosition,
    hasBottom,
    ...args
  }) => (
    <HorizontalCard size={size} {...args}>
      <Thumbnail alt="No image" ratio="1:1" radius="full" />
      <CardHeader
        caption={caption}
        captionPosition={captionPosition}
        title={cardTitle}
        hasBottom={hasBottom}
      />
    </HorizontalCard>
  ),
};
