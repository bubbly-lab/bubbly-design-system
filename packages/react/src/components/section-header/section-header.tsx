'use client';

import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { cx } from 'styled-system/css';
import {
  type SectionHeaderVariantProps,
  sectionHeader,
} from 'styled-system/recipes';
import { IconButton } from '../icon-button';
import { Skeleton } from '../skeleton';
import { TextButton } from '../text-button';

interface SectionHeaderBaseProps {
  title?: ReactNode;
  caption?: ReactNode;
  count?: string | number;
  showCaption?: boolean;
  showCount?: boolean;
  onTrailingClick?: MouseEventHandler<HTMLButtonElement>;
  trailingDisabled?: boolean;
  loading?: boolean;
}

type SectionHeaderNoneTrailingProps = {
  trailing?: 'none';
  trailingIcon?: never;
  trailingAriaLabel?: never;
  trailingLabel?: never;
  trailingSuffixIcon?: never;
};

type SectionHeaderIconButtonTrailingProps = {
  trailing: 'iconButton';
  trailingIcon: ReactNode;
  trailingAriaLabel: string;
  trailingLabel?: never;
  trailingSuffixIcon?: never;
};

type SectionHeaderTextButtonTrailingProps = {
  trailing: 'textButton';
  trailingLabel: ReactNode;
  trailingSuffixIcon?: ReactNode;
  trailingIcon?: never;
  trailingAriaLabel?: never;
};

type SectionHeaderTrailingProps =
  | SectionHeaderNoneTrailingProps
  | SectionHeaderIconButtonTrailingProps
  | SectionHeaderTextButtonTrailingProps;

export type SectionHeaderProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'title'
> &
  SectionHeaderBaseProps &
  SectionHeaderVariantProps &
  SectionHeaderTrailingProps;

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  function SectionHeader(props, ref) {
    const [variantProps, localProps] = sectionHeader.splitVariantProps(props);
    const {
      caption,
      className,
      count,
      loading,
      onTrailingClick,
      showCaption = true,
      showCount = false,
      trailingAriaLabel,
      trailingDisabled,
      trailingIcon,
      trailingLabel,
      trailingSuffixIcon,
      title,
      ...restProps
    } = localProps;
    const styles = sectionHeader(variantProps);

    if (loading) {
      return (
        <div
          ref={ref}
          className={cx(styles.root, className)}
          aria-busy
          {...restProps}
        >
          <div className={styles.skeletonStack} data-testid="sh-skeleton-stack">
            <Skeleton
              className={styles.skeletonTitle}
              data-testid="sh-skeleton-bar"
              radius="4px"
            />
            {showCaption ? (
              <Skeleton
                className={styles.skeletonCaption}
                data-testid="sh-skeleton-bar"
                radius="4px"
              />
            ) : null}
          </div>
        </div>
      );
    }

    const shouldRenderCaption = showCaption && hasRenderableNode(caption);
    const shouldRenderCount = showCount && hasRenderableCount(count);

    return (
      <div ref={ref} className={cx(styles.root, className)} {...restProps}>
        <div className={styles.content}>
          {(hasRenderableNode(title) || shouldRenderCount) && (
            <div className={styles.titleRow}>
              {hasRenderableNode(title) ? (
                <div className={styles.title}>{title}</div>
              ) : null}
              {shouldRenderCount ? (
                <div className={styles.count}>{formatCount(count)}</div>
              ) : null}
            </div>
          )}
          {shouldRenderCaption ? (
            <div className={styles.caption}>{caption}</div>
          ) : null}
        </div>
        {variantProps.trailing === 'iconButton' &&
        trailingAriaLabel &&
        hasRenderableNode(trailingIcon) ? (
          <div className={styles.trailing}>
            <IconButton
              aria-label={trailingAriaLabel}
              color="neutral"
              disabled={trailingDisabled}
              icon={trailingIcon}
              onClick={onTrailingClick}
              shape="square"
              size="xsmall"
              buttonType="ghost"
            />
          </div>
        ) : null}
        {variantProps.trailing === 'textButton' &&
        hasRenderableNode(trailingLabel) ? (
          <div className={styles.trailing}>
            <TextButton
              disabled={trailingDisabled}
              onClick={onTrailingClick}
              size="small"
              suffixIcon={trailingSuffixIcon}
            >
              {trailingLabel}
            </TextButton>
          </div>
        ) : null}
      </div>
    );
  },
);

function hasRenderableCount(count: SectionHeaderBaseProps['count']) {
  return count !== undefined && count !== null && `${count}`.length > 0;
}

// Figma docs: count는 999까지 표시하고 초과 시 '999+'로 표기.
// 숫자일 때만 클램프하고, 문자열 count는 호출자가 제어하도록 그대로 둔다.
function formatCount(count: SectionHeaderBaseProps['count']) {
  if (typeof count === 'number' && count > 999) {
    return '999+';
  }
  return count;
}

function hasRenderableNode(node: ReactNode | undefined) {
  return node !== undefined && node !== null && node !== '' && node !== false;
}
