import { IconSearch } from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Result } from './result';

const meta: Meta<typeof Result> = {
  title: 'Components/Result',
  component: Result,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: '아직 등록된 후기가 없어요',
    description: '첫번째로 후기를 작성해보세요',
  },
};

export default meta;
type Story = StoryObj<typeof Result>;

export const Default: Story = {};

export const WithBottom: Story = {
  args: {
    bottom: (
      <Button color="brand" type="weak" size="medium">
        후기 작성하기
      </Button>
    ),
  },
};

export const WithVisualItem: Story = {
  args: {
    visualItem: (
      <IconSearch size={80} color="var(--colors-content-neutral-subtle)" />
    ),
    bottom: (
      <Button color="brand" type="weak" size="medium">
        테마 보러가기
      </Button>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: '검색 결과가 없어요',
    description: undefined,
  },
};

export const DescriptionOnly: Story = {
  args: {
    title: undefined,
    description: '잠시 후 다시 시도해주세요',
  },
};

export const ServerMaintenance: Story = {
  args: {
    visualItem: (
      <IconSearch size={80} color="var(--colors-content-neutral-subtle)" />
    ),
    title: '더 나은 서비스를 위한 서버 점검을 하고 있어요',
    description:
      '이용에 불편을 끼쳐 죄송합니다. 서버 점검으로 인해 일시적으로 접속할 수 없습니다. 빠르게 정상화할 수 있도록 최선을 다하겠습니다.',
    bottom: (
      <Button color="brand" type="weak" size="medium">
        메인으로
      </Button>
    ),
  },
};

export const NoSlots: Story = {
  args: {
    title: undefined,
    description: undefined,
    bottom: (
      <Button color="brand" type="weak" size="medium">
        돌아가기
      </Button>
    ),
  },
};
