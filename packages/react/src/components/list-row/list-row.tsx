'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { forwardRef, type ReactNode } from 'react';
import { cx } from 'styled-system/css';
import { listRow } from 'styled-system/recipes';

import { InfoItem } from '../info-item';
import { InfoList } from '../info-list';

export interface ListRowProps
  extends Omit<HTMLArkProps<'div'>, 'title' | 'children'> {
  /**
   * Main title. Clamped to 2 lines.
   */
  title: ReactNode;
  /**
   * Detail area below title. Clamped to 2 lines.
   * - `string`: rendered as caption (`caption1-regular`, `content.neutral.subtle`)
   * - `string[]`: rendered as auto `<InfoList>` with each item as an `<InfoItem>`
   */
  detail?: string | string[];
  /**
   * When true, title uses `label1-semibold` (vs. `label1-regular`).
   */
  bold?: boolean;
  /**
   * Leading slot. Recommended: `Icon` (from `@bubbly-design-system/icons`),
   * `IconButton`, or `Thumbnail`.
   */
  leading?: ReactNode;
  /**
   * Trailing slot. Recommended: `Icon` (from `@bubbly-design-system/icons`),
   * `IconButton`, or `Thumbnail`.
   */
  trailing?: ReactNode;
}

export const ListRow = forwardRef<HTMLDivElement, ListRowProps>(
  function ListRow(props, ref) {
    const {
      title,
      detail,
      bold = false,
      leading,
      trailing,
      className,
      ...restProps
    } = props;

    const detailVariant: 'none' | 'caption' | 'infoList' =
      typeof detail === 'string'
        ? 'caption'
        : Array.isArray(detail)
          ? 'infoList'
          : 'none';

    const styles = listRow({ bold, detail: detailVariant });

    return (
      <ark.div ref={ref} className={cx(styles.root, className)} {...restProps}>
        {leading != null ? (
          <span className={styles.leading} aria-hidden="true">
            {leading}
          </span>
        ) : null}
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {typeof detail === 'string' ? (
            <div className={styles.caption}>{detail}</div>
          ) : null}
          {Array.isArray(detail) ? (
            <div className={styles.infoListWrap}>
              <InfoList wrapped>
                {detail.map(label => (
                  <InfoItem key={label} label={label} />
                ))}
              </InfoList>
            </div>
          ) : null}
        </div>
        {trailing != null ? (
          <span className={styles.trailing}>{trailing}</span>
        ) : null}
      </ark.div>
    );
  },
);
