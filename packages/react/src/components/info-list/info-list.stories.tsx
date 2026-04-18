import {
  IconLocation,
  IconStar,
  IconTime,
  IconUserCircle,
} from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { infoList } from 'styled-system/recipes';

import { InfoItem } from '../info-item';
import { InfoList } from './info-list';

const { variantMap } = infoList;

const meta: Meta<typeof InfoList> = {
  title: 'Components/InfoList',
  component: InfoList,
  argTypes: {
    direction: {
      control: 'select',
      options: variantMap.direction,
    },
    color: {
      control: 'select',
      options: variantMap.color,
    },
    showDots: {
      control: 'boolean',
    },
  },
  args: {
    direction: 'horizontal',
    color: 'neutral',
    showDots: true,
  },
  render: args => (
    <div style={{ width: '360px', fontFamily: 'var(--fonts-sans)' }}>
      <InfoList {...args}>
        <InfoItem label="Views" />
        <InfoItem label="Likes" />
        <InfoItem label="Shares" />
        <InfoItem label="Comments" />
        <InfoItem label="Saves" />
      </InfoList>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof InfoList>;

export const Default: Story = {};

export const Brand: Story = {
  args: {
    color: 'brand',
  },
};

export const VerticalNeutral: Story = {
  args: {
    direction: 'vertical',
    color: 'neutral',
  },
};

export const VerticalBrand: Story = {
  args: {
    direction: 'vertical',
    color: 'brand',
  },
};

export const WithIcons: Story = {
  args: {
    direction: 'vertical',
    color: 'neutral',
  },
  render: args => (
    <div style={{ width: '360px', fontFamily: 'var(--fonts-sans)' }}>
      <InfoList {...args}>
        <InfoItem label="10:30" prefixIcon={<IconTime />} />
        <InfoItem label="Seoul, KR" prefixIcon={<IconLocation />} />
        <InfoItem label="@ndaemy" prefixIcon={<IconUserCircle />} />
        <InfoItem label="Featured" prefixIcon={<IconStar filled />} />
      </InfoList>
    </div>
  ),
};

export const NoDots: Story = {
  args: {
    showDots: false,
  },
  render: args => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '360px',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      <InfoList {...args} direction="horizontal">
        <InfoItem label="Views" />
        <InfoItem label="Likes" />
        <InfoItem label="Shares" />
      </InfoList>
      <InfoList {...args} direction="vertical">
        <InfoItem label="First line" />
        <InfoItem label="Second line" />
        <InfoItem label="Third line" />
      </InfoList>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    direction: 'horizontal',
    color: 'neutral',
  },
  render: args => (
    <div style={{ width: '240px', fontFamily: 'var(--fonts-sans)' }}>
      <InfoList {...args}>
        <InfoItem label="Very long first label" />
        <InfoItem label="Another long label" />
        <InfoItem label="Third lengthy item" />
      </InfoList>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        width: '720px',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      {variantMap.direction.map(direction =>
        variantMap.color.map(color => (
          <div
            key={`${direction}-${color}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <strong style={{ color: 'var(--colors-content-neutral-strong)' }}>
              {direction} × {color}
            </strong>
            <InfoList direction={direction} color={color}>
              <InfoItem label="Label" />
              <InfoItem label="Label" />
              <InfoItem label="Label" />
              <InfoItem label="Label" />
              <InfoItem label="Label" />
            </InfoList>
          </div>
        )),
      )}
    </div>
  ),
};
