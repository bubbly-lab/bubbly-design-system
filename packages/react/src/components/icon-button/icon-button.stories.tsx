import {
  IconArrowRight,
  IconLink,
  IconPlus,
} from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=32-3',
    },
  },
  argTypes: {
    color: { control: 'select', options: variantMap.color },
    buttonType: {
      control: 'select',
      options: variantMap.buttonType,
      description:
        '`standard` is a bare icon with no background/padding (for inline affordances like a clear button); the others add a surface.',
    },
    shape: { control: 'select', options: variantMap.shape },
    size: { control: 'select', options: variantMap.size },
    disabled: { control: 'boolean' },
    'aria-label': {
      control: 'text',
      description: 'Required. Accessible name for the icon-only button.',
    },
  },
  args: {
    icon: <IconArrowRight />,
    'aria-label': 'Action',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { onClick: fn() },
  // IB1 happy: aria-label로 접근한 버튼 클릭 시 onClick이 1회 호출된다.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Action' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },
  // IB3 regression: disabled면 [disabled]+data-disabled가 붙고 onClick이 억제된다.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Action' });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('data-disabled');
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
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
