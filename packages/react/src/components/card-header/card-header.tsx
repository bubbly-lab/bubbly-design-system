'use client';

import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';
import { cx } from 'styled-system/css';
import { type CardHeaderVariantProps, cardHeader } from 'styled-system/recipes';
import { Skeleton } from '../skeleton';

export type CardHeaderProps = Omit<ComponentPropsWithoutRef<'div'>, 'title'> &
  CardHeaderVariantProps & {
    title?: ReactNode;
    caption?: ReactNode;
    metadata?: string[];
    loading?: boolean;
  };

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const [variantProps, localProps] = cardHeader.splitVariantProps(props);
    const { caption, className, loading, metadata, title, ...restProps } =
      localProps;
    const styles = cardHeader(variantProps);

    if (loading) {
      return (
        <div
          ref={ref}
          className={cx(styles.root, className)}
          aria-busy
          {...restProps}
        >
          <div className={styles.skeletonStack} data-testid="ch-skeleton-stack">
            {createSkeletonBars(variantProps).map(bar => (
              <Skeleton
                key={bar.key}
                data-testid="ch-skeleton-bar"
                radius="4px"
                style={{
                  width: bar.width,
                  height: bar.height,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    const shouldRenderMetadata = (metadata?.length ?? 0) > 0;
    const metadataEntries = createMetadataEntries(metadata);

    return (
      <div ref={ref} className={cx(styles.root, className)} {...restProps}>
        {variantProps.captionPosition !== 'none' && caption ? (
          <div className={styles.caption}>{caption}</div>
        ) : null}
        {title ? <div className={styles.title}>{title}</div> : null}
        {variantProps.hasBottom !== false && shouldRenderMetadata ? (
          <div className={styles.bottom}>
            <div className={styles.metadata}>
              {metadataEntries.map((entry, index) => (
                <MetadataItem
                  key={entry.key}
                  item={entry.value}
                  isLast={index === metadataEntries.length - 1}
                  itemClassName={styles.item}
                  separatorClassName={styles.separator}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);

interface MetadataItemProps {
  item: string;
  isLast: boolean;
  itemClassName: string;
  separatorClassName: string;
}

function MetadataItem({
  item,
  isLast,
  itemClassName,
  separatorClassName,
}: MetadataItemProps) {
  return (
    <span className={itemClassName}>
      <span>{item}</span>
      {isLast ? null : <span className={separatorClassName}>·</span>}
    </span>
  );
}

function createMetadataEntries(metadata?: string[]) {
  const counts = new Map<string, number>();

  return (metadata ?? []).map(item => {
    const nextCount = (counts.get(item) ?? 0) + 1;

    counts.set(item, nextCount);

    return {
      key: `${item}-${nextCount}`,
      value: item,
    };
  });
}

// Loading skeleton bars replace the visible text slots. Height is per slot type
// — caption/bottom match the 16px text line, title the 18px line (Figma spec,
// intentionally smaller than the rendered text line-heights). Width follows the
// caption/title pair by order: the first of the pair is full-width (100%), the
// second is 70%; a lone title (captionPosition='none') is 70%; the bottom bar is
// always 35%.
interface SkeletonBar {
  key: 'caption' | 'title' | 'bottom';
  width: '100%' | '70%' | '35%';
  height: '16px' | '18px';
}

function createSkeletonBars(
  variantProps: CardHeaderVariantProps,
): SkeletonBar[] {
  const captionPosition = variantProps.captionPosition ?? 'top';
  const hasBottom = variantProps.hasBottom !== false;

  const captionBar: SkeletonBar = {
    key: 'caption',
    width: '100%',
    height: '16px',
  };
  const titleBar: SkeletonBar = { key: 'title', width: '70%', height: '18px' };
  const bottomBar: SkeletonBar = {
    key: 'bottom',
    width: '35%',
    height: '16px',
  };

  const ordered =
    captionPosition === 'none'
      ? [titleBar]
      : captionPosition === 'bottom'
        ? [
            { ...titleBar, width: '100%' as const },
            { ...captionBar, width: '70%' as const },
          ]
        : [captionBar, { ...titleBar, width: '70%' as const }];

  return hasBottom ? [...ordered, bottomBar] : ordered;
}
