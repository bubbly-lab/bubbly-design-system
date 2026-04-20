import {
  IconChevronRight,
  IconClose,
  IconSearch,
  IconTime,
} from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { listRow } from 'styled-system/recipes';

import { IconButton } from '../icon-button';
import { Thumbnail } from '../thumbnail';
import { ListRow } from './list-row';

const { variantMap } = listRow;

const meta: Meta<typeof ListRow> = {
  title: 'Components/ListRow',
  component: ListRow,
  argTypes: {
    title: { control: 'text' },
    detail: { control: 'text' },
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
    trailing: (
      <IconButton
        type="standard"
        color="neutral"
        icon={<IconClose />}
        aria-label="Remove"
      />
    ),
  },
};

export const WithThumbnail: Story = {
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
  args: {
    title: 'Title',
    detail:
      'This is a very long supporting caption that should also clamp to two lines and truncate gracefully when overflowing',
    leading: <IconTime />,
  },
};

export const AllVariants: Story = {
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
