import { IconChevronRight } from '@bubbly-design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { sectionHeader } from 'styled-system/recipes';
import { SectionHeader } from './section-header';

const { variantMap } = sectionHeader;

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  argTypes: {
    size: { control: 'select', options: variantMap.size },
    trailing: { control: 'select', options: variantMap.trailing },
    showCaption: { control: 'boolean' },
    showCount: { control: 'boolean' },
  },
  args: {
    title: 'Title',
    caption: 'Caption',
    count: '999+',
    showCaption: true,
    showCount: false,
    trailing: 'none',
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  render: args => (
    <div style={{ width: '360px' }}>
      <SectionHeader {...args} />
    </div>
  ),
};

export const WithCount: Story = {
  args: {
    showCount: true,
  },
  render: args => (
    <div style={{ width: '360px' }}>
      <SectionHeader {...args} />
    </div>
  ),
};

export const WithIconButton: Story = {
  args: {
    trailing: 'iconButton',
    trailingAriaLabel: 'Open section actions',
    trailingIcon: <IconChevronRight />,
  },
  render: args => (
    <div style={{ width: '360px' }}>
      <SectionHeader {...args} />
    </div>
  ),
};

export const WithTextButton: Story = {
  args: {
    trailing: 'textButton',
    trailingLabel: '더보기',
    trailingSuffixIcon: <IconChevronRight />,
  },
  render: args => (
    <div style={{ width: '360px' }}>
      <SectionHeader {...args} />
    </div>
  ),
};

export const WithoutCaption: Story = {
  args: {
    showCaption: false,
  },
  render: args => (
    <div style={{ width: '360px' }}>
      <SectionHeader {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {variantMap.size.map(size => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <div
            style={{
              color: '#999',
              fontFamily: 'var(--fonts-sans)',
              fontSize: '12px',
            }}
          >
            {size}
          </div>
          {variantMap.trailing.map(trailing =>
            renderVariantRow(size, trailing),
          )}
        </div>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '360px' }}>
        <SectionHeader
          caption="Long supporting caption that should truncate cleanly when the row gets tight"
          title="This is a very long section title that should truncate before the trailing action"
          trailing="iconButton"
          trailingAriaLabel="Open section actions"
          trailingIcon={<IconChevronRight />}
        />
      </div>
      <div style={{ width: '360px' }}>
        <SectionHeader
          caption="Long supporting caption that should truncate cleanly when the row gets tight"
          showCount
          count="999+"
          title="This is a very long section title that should wrap to a second line and keep the count anchored on the lower right edge"
          trailing="textButton"
          trailingLabel="더보기"
        />
      </div>
    </div>
  ),
};

function renderVariantRow(
  size: (typeof variantMap.size)[number],
  trailing: (typeof variantMap.trailing)[number],
) {
  if (trailing === 'iconButton') {
    return (
      <div key={`${size}-${trailing}`} style={{ width: '360px' }}>
        <SectionHeader
          caption="Caption"
          count="999+"
          showCount
          size={size}
          title="Title"
          trailing="iconButton"
          trailingAriaLabel="Open section actions"
          trailingIcon={<IconChevronRight />}
        />
      </div>
    );
  }

  if (trailing === 'textButton') {
    return (
      <div key={`${size}-${trailing}`} style={{ width: '360px' }}>
        <SectionHeader
          caption="Caption"
          count="999+"
          showCount
          size={size}
          title="Title"
          trailing="textButton"
          trailingLabel="더보기"
          trailingSuffixIcon={<IconChevronRight />}
        />
      </div>
    );
  }

  return (
    <div key={`${size}-${trailing}`} style={{ width: '360px' }}>
      <SectionHeader
        caption="Caption"
        count="999+"
        size={size}
        title="Title"
        trailing="none"
      />
    </div>
  );
}
