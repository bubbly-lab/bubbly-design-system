import type { Meta, StoryObj } from '@storybook/react';
import { cardHeader } from 'styled-system/recipes';

import { CardHeader } from './card-header';

const { variantMap } = cardHeader;

const meta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader',
  component: CardHeader,
  argTypes: {
    captionPosition: {
      control: 'select',
      options: variantMap.captionPosition,
    },
    hasBottom: { control: 'boolean' },
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
