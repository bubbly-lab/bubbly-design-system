'use client';

import {
  Children,
  type ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from 'styled-system/css';
import { type InfoListVariantProps, infoList } from 'styled-system/recipes';

import {
  INFO_ITEM_DISPLAY_NAME,
  InfoItem,
  type InfoItemProps,
} from '../info-item';

export interface InfoListProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, 'color'>,
    InfoListVariantProps {
  showDots?: boolean;
  children?: ReactNode;
}

function getDisplayName(type: ReactElement['type']): string | undefined {
  if (typeof type !== 'function' && typeof type !== 'object') {
    return undefined;
  }

  if (!('displayName' in type)) {
    return undefined;
  }

  const { displayName } = type;

  return typeof displayName === 'string' ? displayName : undefined;
}

function isInfoItemElement(
  child: ReactNode,
): child is ReactElement<InfoItemProps> {
  if (!isValidElement(child)) {
    return false;
  }

  if (child.type === InfoItem) {
    return true;
  }

  if (typeof child.type === 'string') {
    return false;
  }

  return getDisplayName(child.type) === INFO_ITEM_DISPLAY_NAME;
}

export const InfoList = forwardRef<HTMLUListElement, InfoListProps>(
  function InfoList(props, ref) {
    const [variantProps, restProps] = infoList.splitVariantProps(props);
    const { children, className, showDots = true, ...htmlProps } = restProps;
    const styles = infoList(variantProps);
    const direction: 'horizontal' | 'vertical' =
      variantProps.direction === 'vertical' ? 'vertical' : 'horizontal';

    const items = Children.toArray(children).filter(isInfoItemElement);

    return (
      <ul ref={ref} className={cx(styles.root, className)} {...htmlProps}>
        {items.map((item, index) => {
          const rowKey = item.key ?? index;
          const shouldShowLeadingDot =
            showDots && (direction === 'vertical' || index > 0);

          return (
            <li key={rowKey} className={styles.row}>
              {shouldShowLeadingDot ? (
                <span className={styles.dot} aria-hidden="true">
                  ·
                </span>
              ) : null}
              {item}
            </li>
          );
        })}
      </ul>
    );
  },
);
