'use client';

import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';
import { cx } from 'styled-system/css';
import { infoList } from 'styled-system/recipes';

export const INFO_ITEM_DISPLAY_NAME = 'InfoItem';

export interface InfoItemProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  label: ReactNode;
  prefixIcon?: ReactNode;
}

export const InfoItem = forwardRef<HTMLDivElement, InfoItemProps>(
  function InfoItem({ className, label, prefixIcon, ...props }, ref) {
    const styles = infoList();

    return (
      <div ref={ref} className={cx(styles.item, className)} {...props}>
        {prefixIcon ? (
          <span className={styles.icon} aria-hidden="true">
            {prefixIcon}
          </span>
        ) : null}
        <span className={styles.label}>{label}</span>
      </div>
    );
  },
);

InfoItem.displayName = INFO_ITEM_DISPLAY_NAME;
