import type { Meta, StoryObj } from '@storybook/react';
import { cardHeader, horizontalCard } from 'styled-system/recipes';
import { CardHeader } from '../card-header';
import { Thumbnail } from '../thumbnail';
import { HorizontalCard } from './horizontal-card';

const { variantMap } = horizontalCard;
const { variantMap: cardHeaderVariants } = cardHeader;

const DEMO_IMG = 'https://picsum.photos/seed/bubbly-hcard/200/200';

const meta: Meta = {
  title: 'Components/HorizontalCard',
  component: HorizontalCard,
  argTypes: {
    size: { control: 'select', options: variantMap.size },
    zoom: { control: 'boolean' },
    border: { control: 'boolean' },
    loading: { control: 'boolean' },
    src: { control: 'text' },
    cardTitle: { control: 'text' },
    caption: { control: 'text' },
    captionPosition: {
      control: 'select',
      options: cardHeaderVariants.captionPosition,
    },
    hasBottom: { control: 'boolean' },
  },
  args: {
    style: { width: '308px' },
    size: 'small',
    zoom: true,
    border: false,
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
    zoom,
    border,
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
        zoom={zoom}
        border={border}
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
    zoom,
    border,
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
              zoom={zoom}
              border={border}
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
    zoom,
    border,
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
              zoom={zoom}
              border={border}
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
  render: ({ size, zoom, border, loading, src, captionPosition, ...args }) => (
    <HorizontalCard size={size} {...args}>
      <Thumbnail
        src={loading ? undefined : src}
        alt="Long text demo"
        ratio="1:1"
        radius="full"
        zoom={zoom}
        border={border}
        loading={loading}
      />
      <CardHeader
        caption="This is a very long caption that should be truncated with ellipsis"
        captionPosition={captionPosition}
        title="This is a very long title text that should also be truncated with ellipsis overflow"
        hasBottom
        metadata={['Very Long Label', 'Another Long Label', 'Third Label']}
      />
    </HorizontalCard>
  ),
};

export const NarrowContainer: Story = {
  args: { style: undefined },
  render: ({
    zoom,
    border,
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
              zoom={zoom}
              border={border}
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
