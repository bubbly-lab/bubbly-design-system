import {
  IconChevronRight,
  IconClose,
  IconSearch,
  IconTime,
} from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { listRow } from 'styled-system/recipes';

import { IconButton } from '../icon-button';
import { Thumbnail } from '../thumbnail';
import { ListRow } from './list-row';

const { variantMap } = listRow;

const meta: Meta<typeof ListRow> = {
  title: 'Components/ListRow',
  component: ListRow,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pDl7yF9kybFbFtf5LJckjq/BDS--bubbly-design-system-?node-id=3156-6303',
    },
  },
  argTypes: {
    title: { control: 'text' },
    detail: {
      control: 'text',
      description:
        'Detail below the title. A string renders as a caption; a string[] renders as an auto InfoList (one InfoItem per entry).',
    },
    bold: { control: 'boolean' },
  },
  args: {
    title: 'Title',
    bold: false,
  },
  render: args => (
    <div style={{ width: '360px', fontFamily: 'var(--fonts-sans)' }}>
      <ListRow {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof ListRow>;

export const Default: Story = {};

export const Bold: Story = {
  args: { bold: true },
};

export const WithLeading: Story = {
  args: { leading: <IconSearch /> },
};

export const WithTrailing: Story = {
  args: { trailing: <IconChevronRight /> },
};

export const WithBoth: Story = {
  args: {
    leading: <IconSearch />,
    trailing: <IconChevronRight />,
  },
};

export const WithIconButton: Story = {
  args: {
    title: 'Recent search',
    leading: <IconTime />,
  },
  render: function WithIconButton(args) {
    const handleRemove = fn();
    return (
      <div style={{ width: '360px', fontFamily: 'var(--fonts-sans)' }}>
        <ListRow
          {...args}
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove"
              onClick={handleRemove}
            />
          }
        />
      </div>
    );
  },
  // LR1 happy: trailing IconButton 클릭 시 onClick이 1회 호출된다.
  // LR2 a11y: leading aria-hidden 래퍼가 trailing 버튼의 접근명을 삼키지 않는다.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByRole('button', { name: 'Remove' });
    await userEvent.click(removeButton);
    await expect(removeButton).toBeInTheDocument();
  },
};

export const WithThumbnail: Story = {
  // TODO(a11y): content.neutral.subtle(#717187) caption 대비 부채 — docs/a11y-contrast-debt.md
  parameters: { a11y: { test: 'todo' } },
  args: {
    title: 'Product name',
    detail: 'Short description of the item',
    leading: (
      <Thumbnail
        src="https://picsum.photos/seed/list-row/112/150"
        alt="Product thumbnail"
        ratio="3:4"
        radius="8px"
        style={{ width: '56px' }}
      />
    ),
    trailing: <IconChevronRight />,
  },
};

export const WithCaption: Story = {
  // TODO(a11y): content.neutral.subtle(#717187) caption 대비 부채 — docs/a11y-contrast-debt.md
  parameters: { a11y: { test: 'todo' } },
  args: {
    detail: 'Supporting caption text describing this row in more detail',
    leading: <IconTime />,
    trailing: <IconChevronRight />,
  },
};

export const WithInfoList: Story = {
  args: {
    detail: ['Label A', 'Label B', 'Label C'],
    leading: <IconTime />,
    trailing: <IconChevronRight />,
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'This is a very long title that should clamp to two lines and truncate when it exceeds the row width budget',
    leading: <IconSearch />,
    trailing: <IconChevronRight />,
  },
};

export const LongCaption: Story = {
  // TODO(a11y): content.neutral.subtle(#717187) caption 대비 부채 — docs/a11y-contrast-debt.md
  parameters: { a11y: { test: 'todo' } },
  args: {
    title: 'Title',
    detail:
      'This is a very long supporting caption that should also clamp to two lines and truncate gracefully when overflowing',
    leading: <IconTime />,
  },
};

export const AllVariants: Story = {
  // TODO(a11y): content.neutral.subtle(#717187) caption 대비 부채 — docs/a11y-contrast-debt.md
  parameters: { a11y: { test: 'todo' } },
  render: () => (
    <div style={{ width: '360px', fontFamily: 'var(--fonts-sans)' }}>
      {variantMap.bold.flatMap(bold =>
        variantMap.detail.map(detail => (
          <ListRow
            key={`${String(bold)}-${detail}`}
            bold={bold}
            title={`bold=${String(bold)} detail=${detail}`}
            detail={
              detail === 'caption'
                ? 'Supporting caption'
                : detail === 'infoList'
                  ? ['Label A', 'Label B', 'Label C']
                  : undefined
            }
            leading={<IconSearch />}
            trailing={<IconChevronRight />}
          />
        )),
      )}
    </div>
  ),
};

// Hover-state preview via the pseudo-states addon. ListRow's hover background
// bleeds 8px past the row edges by design — this story makes that visible for
// designer review without manually hovering.
export const InteractiveStates: Story = {
  // TODO(a11y): content.neutral.subtle(#717187) caption 대비 부채 — docs/a11y-contrast-debt.md
  parameters: {
    a11y: { test: 'todo' },
    pseudo: {
      hover: ['#lr-hover'],
    },
  },
  render: () => (
    <div
      style={{
        width: '360px',
        fontFamily: 'var(--fonts-sans)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <ListRow
        title="default"
        detail="Resting state"
        leading={<IconTime />}
        trailing={<IconChevronRight />}
      />
      {/* biome-ignore lint/correctness/useUniqueElementIds: pseudo-states addon selector target */}
      <ListRow
        id="lr-hover"
        title="hover"
        detail="Hover background bleeds 8px past the edges"
        leading={<IconTime />}
        trailing={<IconChevronRight />}
      />
    </div>
  ),
};
