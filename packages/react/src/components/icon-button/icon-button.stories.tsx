import {
  IconArrowRight,
  IconLink,
  IconPlus,
} from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { iconButton } from 'styled-system/recipes';
import { IconButton } from './icon-button';

const { variantMap } = iconButton;

const DESIGNED_COMBINATIONS = [
  { color: 'brand', buttonType: 'solid', shape: 'square' },
  { color: 'neutral', buttonType: 'ghost', shape: 'square' },
  { color: 'neutral', buttonType: 'outline', shape: 'round' },
] as const;

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    color: { control: 'select', options: variantMap.color },
    buttonType: { control: 'select', options: variantMap.buttonType },
    shape: { control: 'select', options: variantMap.shape },
    size: { control: 'select', options: variantMap.size },
    disabled: { control: 'boolean' },
  },
  args: {
    icon: <IconArrowRight />,
    'aria-label': 'Action',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {DESIGNED_COMBINATIONS.map(({ color, buttonType, shape }) => (
        <div key={`${color}-${buttonType}-${shape}`}>
          <div
            style={{
              marginBottom: '8px',
              color: '#999',
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
            }}
          >
            {color} / {buttonType} / {shape}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {variantMap.size.map(size => (
              <IconButton
                key={size}
                color={color}
                buttonType={buttonType}
                shape={shape}
                size={size}
                icon={<IconArrowRight />}
                aria-label={`${buttonType} ${size}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Standard: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        style={{
          marginBottom: '8px',
          color: '#999',
          fontSize: '12px',
          fontFamily: 'var(--fonts-sans)',
        }}
      >
        standard (bare icon)
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {(['medium', 'small'] as const).map(size => (
          <IconButton
            key={size}
            buttonType="standard"
            size={size}
            icon={<IconArrowRight />}
            aria-label={`standard ${size}`}
          />
        ))}
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {DESIGNED_COMBINATIONS.map(({ color, buttonType, shape }) => (
        <div key={`${color}-${buttonType}-${shape}`}>
          <div
            style={{
              marginBottom: '8px',
              color: '#999',
              fontSize: '12px',
              fontFamily: 'var(--fonts-sans)',
            }}
          >
            {color} / {buttonType} / {shape}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <IconButton
              color={color}
              buttonType={buttonType}
              shape={shape}
              icon={<IconArrowRight />}
              aria-label="Default"
            />
            <IconButton
              color={color}
              buttonType={buttonType}
              shape={shape}
              icon={<IconArrowRight />}
              aria-label="Disabled"
              disabled
            />
          </div>
        </div>
      ))}
      <div>
        <div
          style={{
            marginBottom: '8px',
            color: '#999',
            fontSize: '12px',
            fontFamily: 'var(--fonts-sans)',
          }}
        >
          standard
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <IconButton
            buttonType="standard"
            icon={<IconArrowRight />}
            aria-label="Default"
          />
          <IconButton
            buttonType="standard"
            icon={<IconArrowRight />}
            aria-label="Disabled"
            disabled
          />
        </div>
      </div>
    </div>
  ),
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <IconButton icon={<IconArrowRight />} aria-label="Navigate" />
      <IconButton
        icon={<IconPlus />}
        aria-label="Add"
        color="neutral"
        buttonType="ghost"
      />
      <IconButton
        icon={<IconLink />}
        aria-label="Copy link"
        color="neutral"
        buttonType="outline"
        shape="round"
      />
    </div>
  ),
};
