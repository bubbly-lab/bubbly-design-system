'use client';

import { Tabs as ArkTabs } from '@ark-ui/react/tabs';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { useTabsStyles } from './tabs-context';

type ArkTabsTriggerProps = ComponentPropsWithoutRef<typeof ArkTabs.Trigger>;

export const TAB_ITEM_DISPLAY_NAME = 'TabItem';

export interface TabItemProps {
  value: ArkTabsTriggerProps['value'];
  label: ReactNode;
  children?: ReactNode;
}

export interface TabItemContentProps {
  value: ArkTabsTriggerProps['value'];
  children?: ReactNode;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  function TabItem({ label, value }, ref) {
    const styles = useTabsStyles();

    return (
      <ArkTabs.Trigger ref={ref} className={styles.trigger} value={value}>
        {label}
      </ArkTabs.Trigger>
    );
  },
);

TabItem.displayName = TAB_ITEM_DISPLAY_NAME;

export function TabItemContent({ children, value }: TabItemContentProps) {
  const styles = useTabsStyles();

  return (
    <ArkTabs.Content className={styles.content} value={value}>
      {children}
    </ArkTabs.Content>
  );
}
