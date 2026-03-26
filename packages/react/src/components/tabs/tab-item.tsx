'use client';

import { Tabs as ArkTabs } from '@ark-ui/react/tabs';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { useTabsStyles } from './tabs-context';

type ArkTabsTriggerProps = ComponentPropsWithoutRef<typeof ArkTabs.Trigger>;

export interface TabItemProps {
  value: ArkTabsTriggerProps['value'];
  label: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
}

export interface TabItemContentProps {
  value: ArkTabsTriggerProps['value'];
  children?: ReactNode;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  function TabItem({ disabled, label, value }, ref) {
    const styles = useTabsStyles();

    return (
      <ArkTabs.Trigger
        ref={ref}
        className={styles.trigger}
        disabled={disabled}
        value={value}
      >
        {label}
      </ArkTabs.Trigger>
    );
  },
);

export function TabItemContent({ children, value }: TabItemContentProps) {
  const styles = useTabsStyles();

  return (
    <ArkTabs.Content className={styles.content} value={value}>
      {children}
    </ArkTabs.Content>
  );
}
