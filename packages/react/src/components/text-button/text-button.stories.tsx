import { IconChevronRight, IconReload } from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { textButton } from 'styled-system/recipes';
import { TextButton } from './text-button';

const { variantMap } = textButton;

const meta: Meta<typeof TextButton> = {
  title: 'Components/TextButton',
  component: TextButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=32-3',
    },
  },
  argTypes: {
    size: { control: 'select', options: variantMap.size },
    disabled: { control: 'boolean' },
    prefixIcon: {
      description:
        '레이블 앞에 놓이는 아이콘. `suffixIcon`과는 동시에 쓸 수 없다(타입 수준에서 배타).',
    },
    suffixIcon: {
      description:
        '레이블 뒤에 놓이는 아이콘. `prefixIcon`과는 동시에 쓸 수 없다(타입 수준에서 배타).',
    },
  },
  args: {
    children: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: { onClick: fn() },
  // TB1 happy: 클릭 시 onClick이 1회 호출된다.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Label' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },
  // TB3 regression: disabled면 [disabled]가 붙고 onClick이 호출되지 않는다.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Label' });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
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
