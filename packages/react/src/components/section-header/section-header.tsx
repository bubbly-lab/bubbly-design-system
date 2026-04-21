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
import { TextButton } from '../text-button';

interface SectionHeaderBaseProps {
  title?: ReactNode;
  caption?: ReactNode;
  count?: string | number;
  showCaption?: boolean;
  showCount?: boolean;
  onTrailingClick?: MouseEventHandler<HTMLButtonElement>;
  trailingDisabled?: boolean;
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
                <div className={styles.count}>{count}</div>
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

function hasRenderableNode(node: ReactNode | undefined) {
  return node !== undefined && node !== null && node !== '' && node !== false;
}
