import type { Meta, StoryObj } from '@storybook/react';

import { LoadingIndicator } from './loading-indicator';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
};

export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {};

export const CustomSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {[16, 24, 40, 64].map(size => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <LoadingIndicator
            style={{ width: `${size}px`, height: `${size}px` }}
          />
          <span
            style={{
              color: '#999',
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
            }}
          >
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
};
