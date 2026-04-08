import { IconChevronRight, IconReload } from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { textButton } from 'styled-system/recipes';
import { TextButton } from './text-button';

const { variantMap } = textButton;

const meta: Meta<typeof TextButton> = {
  title: 'Components/TextButton',
  component: TextButton,
  argTypes: {
    size: { control: 'select', options: variantMap.size },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithPrefixIcon: Story = {
  args: { prefixIcon: <IconReload /> },
};

export const WithSuffixIcon: Story = {
  args: { suffixIcon: <IconChevronRight /> },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      {variantMap.size.map(size => (
        <TextButton key={size} size={size}>
          {size}
        </TextButton>
      ))}
    </div>
  ),
};

export const AllSizesWithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      {variantMap.size.map(size => (
        <div
          key={size}
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
        >
          <TextButton size={size} prefixIcon={<IconReload />}>
            {size}
          </TextButton>
          <TextButton size={size} suffixIcon={<IconChevronRight />}>
            {size}
          </TextButton>
          <TextButton size={size}>{size}</TextButton>
        </div>
      ))}
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        fontFamily: 'var(--fonts-sans)',
      }}
    >
      <TextButton prefixIcon={<IconReload />}>Default</TextButton>
      <TextButton suffixIcon={<IconChevronRight />}>Default</TextButton>
      <TextButton prefixIcon={<IconReload />} disabled>
        Disabled
      </TextButton>
      <TextButton suffixIcon={<IconChevronRight />} disabled>
        Disabled
      </TextButton>
    </div>
  ),
};
