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
  argTypes: {
    zoomed: { control: 'boolean' },
    ratio: { control: 'select', options: thumbnailVariants.ratio },
    radius: { control: 'select', options: thumbnailVariants.radius },
    bordered: { control: 'boolean' },
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
