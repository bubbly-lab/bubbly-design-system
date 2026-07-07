import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
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
    loading: {
      control: 'boolean',
      description:
        'true면 title/caption/metadata를 스켈레톤 바로 대체한다(로딩 상태).',
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

export const Loading: Story = {
  args: {
    loading: true,
    captionPosition: 'top',
    caption: 'Caption',
    title: 'Title',
    metadata: ['iOS', 'Finance', '8 min read'],
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvasElement.querySelector('[aria-busy="true"]');
    expect(root).toBeInTheDocument();

    const stack = canvasElement.querySelector(
      '[data-testid="ch-skeleton-stack"]',
    );
    expect(stack).toBeInstanceOf(HTMLElement);
    if (stack instanceof HTMLElement) {
      expect(getComputedStyle(stack).gap).toBe('10px');
    }

    const bars = canvasElement.querySelectorAll(
      '[data-testid="ch-skeleton-bar"]',
    );
    expect(bars.length).toBe(3);

    const heights = Array.from(bars).map(b => getComputedStyle(b).height);
    expect(heights).toEqual(['16px', '18px', '16px']);

    const widths = Array.from(bars).map(b =>
      Math.round(b.getBoundingClientRect().width),
    );
    expect(widths).toEqual([200, 140, 70]);

    const radii = Array.from(bars).map(b => getComputedStyle(b).borderRadius);
    expect(radii).toEqual(['4px', '4px', '4px']);

    expect(canvas.queryByText('Title')).not.toBeInTheDocument();
    expect(canvas.queryByText('Caption')).not.toBeInTheDocument();
  },
};

export const LoadingCaptionBottom: Story = {
  tags: ['!dev'],
  args: {
    loading: true,
    captionPosition: 'bottom',
    caption: 'Caption',
    title: 'Title',
    metadata: ['iOS', 'Finance', '8 min read'],
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const bars = canvasElement.querySelectorAll(
      '[data-testid="ch-skeleton-bar"]',
    );
    expect(bars.length).toBe(3);

    const heights = Array.from(bars).map(b => getComputedStyle(b).height);
    expect(heights).toEqual(['18px', '16px', '16px']);

    const widths = Array.from(bars).map(b =>
      Math.round(b.getBoundingClientRect().width),
    );
    expect(widths).toEqual([200, 140, 70]);
  },
};

export const LoadingCaptionNone: Story = {
  tags: ['!dev'],
  args: {
    loading: true,
    captionPosition: 'none',
    caption: undefined,
    title: 'Title',
    metadata: ['iOS', 'Finance', '8 min read'],
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const bars = canvasElement.querySelectorAll(
      '[data-testid="ch-skeleton-bar"]',
    );
    expect(bars.length).toBe(2);

    const heights = Array.from(bars).map(b => getComputedStyle(b).height);
    expect(heights).toEqual(['18px', '16px']);

    const widths = Array.from(bars).map(b =>
      Math.round(b.getBoundingClientRect().width),
    );
    expect(widths).toEqual([140, 70]);
  },
};

export const LoadingWithoutBottom: Story = {
  tags: ['!dev'],
  args: {
    loading: true,
    captionPosition: 'top',
    hasBottom: false,
    caption: 'Caption',
    title: 'Title',
    metadata: ['iOS', 'Finance', '8 min read'],
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const bars = canvasElement.querySelectorAll(
      '[data-testid="ch-skeleton-bar"]',
    );
    expect(bars.length).toBe(2);

    const heights = Array.from(bars).map(b => getComputedStyle(b).height);
    expect(heights).toEqual(['16px', '18px']);

    const widths = Array.from(bars).map(b =>
      Math.round(b.getBoundingClientRect().width),
    );
    expect(widths).toEqual([200, 140]);
  },
};
