import type { Meta, StoryObj } from '@storybook/react';
import { thumbnail } from 'styled-system/recipes';
import { Thumbnail } from './thumbnail';

const { variantMap } = thumbnail;

const DEMO_IMG_1_1 = 'https://picsum.photos/seed/bubbly-thumbnail/400/400';
const DEMO_IMG_3_4 = 'https://picsum.photos/seed/bubbly-thumbnail/300/400';

function getDemoImage(ratio: '1:1' | '3:4') {
  return ratio === '1:1' ? DEMO_IMG_1_1 : DEMO_IMG_3_4;
}

// radius='full' is only valid with ratio='1:1'
function isValidCombination(ratio: string, radius: string) {
  if (radius === 'full' && ratio !== '1:1') return false;
  return true;
}

const meta: Meta<typeof Thumbnail> = {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  argTypes: {
    ratio: { control: 'select', options: variantMap.ratio },
    radius: { control: 'select', options: variantMap.radius },
    bordered: { control: 'boolean' },
    zoomed: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    src: DEMO_IMG_1_1,
    alt: 'Demo thumbnail',
    style: { width: '200px' },
  },
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const Placeholder: Story = {
  args: { src: undefined },
};

export const WithBorder: Story = {
  args: { bordered: true },
};

export const WithZoom: Story = {
  args: { zoomed: true },
};

export const AllRatios: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {variantMap.ratio.map(ratio => (
        <div
          key={ratio}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <Thumbnail
            ratio={ratio}
            src={getDemoImage(ratio)}
            alt={`ratio ${ratio}`}
            style={{ width: '200px' }}
          />
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
              color: '#999',
            }}
          >
            ratio={ratio}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {variantMap.radius.map(radius => (
        <div
          key={radius}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <Thumbnail
            radius={radius}
            src={DEMO_IMG_1_1}
            alt={`radius ${radius}`}
            style={{ width: '200px' }}
          />
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
              color: '#999',
            }}
          >
            radius={radius}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {variantMap.ratio.map(ratio => (
        <div key={ratio}>
          <div
            style={{
              marginBottom: '12px',
              color: '#999',
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
            }}
          >
            ratio={ratio}
          </div>
          <div
            style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
          >
            {variantMap.radius
              .filter(radius => isValidCombination(ratio, radius))
              .map(radius => (
                <div
                  key={radius}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  <Thumbnail
                    ratio={ratio}
                    radius={radius}
                    src={getDemoImage(ratio)}
                    alt={`${ratio} ${radius}`}
                    style={{ width: '180px' }}
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--fonts-sans)',
                      color: '#777',
                    }}
                  >
                    {radius}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      {[
        { label: 'default', props: { src: DEMO_IMG_1_1 } },
        { label: 'placeholder', props: { src: undefined } },
        { label: 'loading', props: { loading: true } },
        { label: 'bordered', props: { src: DEMO_IMG_1_1, bordered: true } },
      ].map(({ label, props }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'center',
          }}
        >
          <Thumbnail alt={label} style={{ width: '160px' }} {...props} />
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--fonts-sans)',
              color: '#777',
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};
