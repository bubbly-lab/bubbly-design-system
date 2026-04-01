'use client';

import { Tabs as ArkTabs } from '@ark-ui/react/tabs';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { useTabsStyles } from './tabs-context';

type ArkTabsTriggerProps = ComponentPropsWithoutRef<typeof ArkTabs.Trigger>;

export const ITEM_DISPLAY_NAME = 'Item';

export interface ItemProps {
  value: ArkTabsTriggerProps['value'];
  label: ReactNode;
  children?: ReactNode;
}

export interface ItemContentProps {
  value: ArkTabsTriggerProps['value'];
  children?: ReactNode;
}

export const Item = forwardRef<HTMLButtonElement, ItemProps>(function Item(
  { label, value },
  ref,
) {
  const styles = useTabsStyles();

  return (
    <ArkTabs.Trigger ref={ref} className={styles.trigger} value={value}>
      {label}
    </ArkTabs.Trigger>
  );
});

Item.displayName = ITEM_DISPLAY_NAME;

export function ItemContent({ children, value }: ItemContentProps) {
  const styles = useTabsStyles();

  return (
    <ArkTabs.Content className={styles.content} value={value}>
      {children}
    </ArkTabs.Content>
  );
}
