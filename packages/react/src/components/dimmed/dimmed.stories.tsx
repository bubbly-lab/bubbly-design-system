import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Thumbnail } from '../thumbnail';
import { Dimmed } from './dimmed';

const DEMO_IMG =
  'https://rumyscape-assets.s3.ap-northeast-2.amazonaws.com/uploads/deepthinker_ongyi_dream_ade35e4e8f.jpg';

const meta: Meta<typeof Dimmed> = {
  title: 'Components/Dimmed',
  component: Dimmed,
  argTypes: {
    blurred: { control: 'boolean' },
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
