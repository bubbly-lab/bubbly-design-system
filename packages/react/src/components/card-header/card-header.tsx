'use client';

import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';
import { cx } from 'styled-system/css';
import { type CardHeaderVariantProps, cardHeader } from 'styled-system/recipes';

export type CardHeaderProps = Omit<ComponentPropsWithoutRef<'div'>, 'title'> &
  CardHeaderVariantProps & {
    title?: ReactNode;
    caption?: ReactNode;
    metadata?: string[];
  };

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const [variantProps, localProps] = cardHeader.splitVariantProps(props);
    const { caption, className, metadata, title, ...restProps } = localProps;
    const styles = cardHeader(variantProps);
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
