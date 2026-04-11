import type { Meta, StoryObj } from '@storybook/react';
import { skeleton } from 'styled-system/recipes';
import { Skeleton } from './skeleton';

const { variantMap } = skeleton;

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    radius: { control: 'select', options: variantMap.radius },
  },
  args: {
    radius: 'none',
    style: { width: '100px', height: '100px' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const AllRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
      {variantMap.radius.map(r => (
        <div
          key={r}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <Skeleton radius={r} style={{ width: '100px', height: '100px' }} />
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
              color: '#999',
            }}
          >
            radius={r}
          </span>
        </div>
      ))}
    </div>
  ),
};
