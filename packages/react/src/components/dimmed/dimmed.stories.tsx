import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Thumbnail } from '../thumbnail';
import { Dimmed } from './dimmed';

const DEMO_IMG =
  'https://rumyscape-assets.s3.ap-northeast-2.amazonaws.com/uploads/deepthinker_ongyi_dream_ade35e4e8f.jpg';

const meta: Meta<typeof Dimmed> = {
  title: 'Components/Dimmed',
  component: Dimmed,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=4635-7626',
    },
  },
  argTypes: {
    blurred: {
      control: 'boolean',
      description:
        'true면 오버레이에 backdrop-filter blur(16px)를 적용해 배경을 흐림처리한다. false면 반투명 딤드만 씌운다.',
    },
  },
  args: {
    blurred: true,
  },
};

export default meta;
type Story = StoryObj<typeof Dimmed>;

export const Default: Story = {
  render: (args: ComponentProps<typeof Dimmed>) => (
    <Thumbnail
      src={DEMO_IMG}
      alt="Dimmed overlay example"
      ratio="3:4"
      radius="8px"
      style={{ width: '200px' }}
    >
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div style={{ width: '40%', position: 'relative' }}>
          <Dimmed blurred={args.blurred} />
        </div>
        <div style={{ width: '20%' }} aria-hidden="true" />
        <div style={{ width: '40%', position: 'relative' }}>
          <Dimmed blurred={args.blurred} />
        </div>
      </div>
    </Thumbnail>
  ),
};

// Side-by-side proof of the `blurred` axis (Figma: blur true/false). The Default
// story is Controls-driven; this one makes both states visible at once for QA.
export const BlurComparison: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: '24px', fontFamily: 'var(--fonts-sans)' }}
    >
      {[true, false].map(blurred => (
        <div key={String(blurred)}>
          <div
            style={{
              marginBottom: '8px',
              color: '#999',
              fontSize: '12px',
            }}
          >
            blurred = {String(blurred)}
          </div>
          <Thumbnail
            src={DEMO_IMG}
            alt={`blurred ${String(blurred)}`}
            ratio="3:4"
            radius="8px"
            style={{ width: '200px' }}
          >
            <div
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              <Dimmed blurred={blurred} />
            </div>
          </Thumbnail>
        </div>
      ))}
    </div>
  ),
};
