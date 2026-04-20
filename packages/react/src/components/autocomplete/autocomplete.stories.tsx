import {
  IconClose,
  IconSearch,
  IconTime,
} from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { IconButton } from '../icon-button';
import { SectionHeader } from '../section-header';
import { Thumbnail } from '../thumbnail';
import { Autocomplete, type AutocompleteProps } from './autocomplete';
import { AutocompleteHighlight } from './autocomplete-highlight';
import { AutocompleteItem } from './autocomplete-item';
import { highlightMatch } from './highlight-match';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    type: {
      control: 'select',
      options: ['modal', 'fullScreen'],
    },
    state: {
      control: 'select',
      options: ['default', 'loading', 'empty'],
    },
    headerTitle: { control: 'text' },
    emptyTitle: { control: 'text' },
    emptyDescription: { control: 'text' },
  },
  args: {
    type: 'modal',
    state: 'default',
    headerTitle: '추천',
  },
  parameters: {
    backgrounds: {
      options: {
        darker: { name: 'Darker', value: 'rgb(0 0 0)' },
      },
    },
  },
  globals: {
    backgrounds: { value: 'darker' },
  },
  render: args => (
    <div style={{ fontFamily: 'var(--fonts-sans)' }}>
      <Autocomplete {...args}>
        <AutocompleteItem
          title={highlightMatch('제주 카페 추천', '제주')}
          leading={<IconSearch />}
          bold
        />
        <AutocompleteItem
          title={highlightMatch('제주도 바다 전망', '제주')}
          leading={<IconSearch />}
          bold
        />
        <AutocompleteItem
          title="강남 브런치"
          leading={<IconTime />}
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove"
            />
          }
        />
      </Autocomplete>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};

export const Modal: Story = {
  args: { type: 'modal' },
};

export const FullScreen: Story = {
  args: { type: 'fullScreen' },
  decorators: [
    Story => (
      <div
        style={{
          width: '360px',
          backgroundColor: 'rgb(31 31 39)',
          padding: '16px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: { state: 'loading' },
};

export const Empty: Story = {
  args: {
    state: 'empty',
    emptyTitle: '결과 없음',
    emptyDescription: '검색 결과가 없어요.',
    emptyAction: <Button>다시 검색</Button>,
  },
};

export const WithManualHighlight: Story = {
  name: 'Highlight (manual composition)',
  render: args => (
    <div style={{ fontFamily: 'var(--fonts-sans)' }}>
      <Autocomplete {...args}>
        <AutocompleteItem
          title={
            <>
              Tit<AutocompleteHighlight>le</AutocompleteHighlight>
            </>
          }
          leading={<IconSearch />}
          bold
        />
        <AutocompleteItem
          title={
            <>
My <AutocompleteHighlight>cafe</AutocompleteHighlight> is a nice{' '}
                <AutocompleteHighlight>cafe</AutocompleteHighlight>
            </>
          }
          leading={<IconSearch />}
          bold
        />
      </Autocomplete>
    </div>
  ),
};

export const WithHighlightMatchUtil: Story = {
  name: 'Highlight (highlightMatch utility)',
  render: args => (
    <div style={{ fontFamily: 'var(--fonts-sans)' }}>
      <Autocomplete {...args}>
        <AutocompleteItem
          title={highlightMatch('제주 카페 추천', '카페')}
          leading={<IconSearch />}
          bold
        />
        <AutocompleteItem
          title={highlightMatch('My CAFE is a nice cafe', 'cafe')}
          leading={<IconSearch />}
          bold
        />
        <AutocompleteItem
          title={highlightMatch('no match here', 'xyz')}
          leading={<IconSearch />}
        />
      </Autocomplete>
    </div>
  ),
};

type HighlightMatchPlaygroundArgs = AutocompleteProps & {
  text: string;
  query: string;
};

export const HighlightMatchPlayground: StoryObj<HighlightMatchPlaygroundArgs> =
  {
    name: 'highlightMatch Playground',
    args: {
      type: 'modal',
      state: 'default',
      headerTitle: 'Playground',
      text: "제로월드",
      query: "제로",
    },
    argTypes: {
      text: {
        control: 'text',
        description: 'First argument of `highlightMatch` — the text to render.',
        table: { category: 'highlightMatch args' },
      },
      query: {
        control: 'text',
        description:
          'Second argument of `highlightMatch` — substring to highlight (case-insensitive, all occurrences). Empty string → no highlight.',
        table: { category: 'highlightMatch args' },
      },
    },
    render: ({ text, query, ...args }) => (
      <div style={{ fontFamily: 'var(--fonts-sans)' }}>
        <Autocomplete {...args}>
          <AutocompleteItem
            title={highlightMatch(text, query)}
            leading={<IconSearch />}
            bold
          />
        </Autocomplete>
      </div>
    ),
  };

export const WithSections: Story = {
  render: args => (
    <div style={{ fontFamily: 'var(--fonts-sans)' }}>
      <Autocomplete {...args}>
        <SectionHeader title="최근 검색" />
        <AutocompleteItem
          title="제주 카페"
          leading={<IconTime />}
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove recent search"
            />
          }
        />
        <AutocompleteItem
          title="바다 전망"
          leading={<IconTime />}
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove recent search"
            />
          }
        />
        <SectionHeader title="추천" />
        <AutocompleteItem
          title={highlightMatch('제주 카페 추천', '제주')}
          leading={<IconSearch />}
          bold
        />
        <AutocompleteItem
          title={highlightMatch('제주도 브런치', '제주')}
          leading={<IconSearch />}
          bold
        />
      </Autocomplete>
    </div>
  ),
};

export const ItemVariantsMatchingFigma: Story = {
  name: 'AutocompleteItem variants (Figma)',
  render: args => (
    <div style={{ fontFamily: 'var(--fonts-sans)' }}>
      <Autocomplete {...args}>
        <AutocompleteItem
          title={highlightMatch('Title', 'e')}
          leading={<IconTime />}
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove"
            />
          }
        />
        <AutocompleteItem
          title={highlightMatch('Title', 'e')}
          leading={<IconSearch />}
          bold
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove"
            />
          }
        />
        <AutocompleteItem
          title={highlightMatch('Title', 'e')}
          detail={['Label', 'Label', 'Label']}
          leading={
            <Thumbnail
              src="https://picsum.photos/seed/ac-round/56"
              alt="thumb"
              radius="full"
              style={{ width: '56px' }}
            />
          }
          bold
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove"
            />
          }
        />
        <AutocompleteItem
          title={highlightMatch('Title', 'e')}
          detail={['Label', 'Label', 'Label']}
          leading={
            <Thumbnail
              src="https://picsum.photos/seed/ac-portrait/56/75"
              alt="thumb"
              ratio="3:4"
              radius="8px"
              style={{ width: '56px' }}
            />
          }
          bold
          trailing={
            <IconButton
              buttonType="standard"
              color="neutral"
              icon={<IconClose />}
              aria-label="Remove"
            />
          }
        />
      </Autocomplete>
    </div>
  ),
};
