'use client';

import { Tabs as ArkTabs } from '@ark-ui/react/tabs';
import {
  Children,
  type ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from 'styled-system/css';
import { type TabsVariantProps, tabs } from 'styled-system/recipes';

import {
  TAB_ITEM_DISPLAY_NAME,
  TabItem,
  TabItemContent,
  type TabItemContentProps,
  type TabItemProps,
} from './tab-item';
import { TabsStylesContext, useTabsStyles } from './tabs-context';

export { TabItem, TabItemContent };
export type { TabItemContentProps, TabItemProps };

export type TabListProps = ComponentPropsWithoutRef<typeof ArkTabs.List>;

export type TabTriggerProps = ComponentPropsWithoutRef<typeof ArkTabs.Trigger>;

export type TabContentProps = ComponentPropsWithoutRef<typeof ArkTabs.Content>;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  function TabList({ children, className, ...props }, ref) {
    const styles = useTabsStyles();

    return (
      <ArkTabs.List ref={ref} className={cx(styles.list, className)} {...props}>
        {children}
        <ArkTabs.Indicator className={styles.indicator} />
      </ArkTabs.List>
    );
  },
);

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  function TabContent({ className, ...props }, ref) {
    const styles = useTabsStyles();

    return (
      <ArkTabs.Content
        ref={ref}
        className={cx(styles.content, className)}
        {...props}
      />
    );
  },
);

export interface TabsProps
  extends ComponentPropsWithoutRef<typeof ArkTabs.Root>,
    TabsVariantProps {
  children?: ReactNode;
  value?: TabTriggerProps['value'];
  defaultValue?: TabTriggerProps['value'];
}

function isTabItemElement(child: ReactNode): child is ReactElement<TabItemProps> {
  if (!isValidElement(child)) {
    return false;
  }

  if (child.type === TabItem) {
    return true;
  }

  if (typeof child.type === 'string') {
    return false;
  }

  return getElementDisplayName(child.type) === TAB_ITEM_DISPLAY_NAME;
}

function getElementDisplayName(type: ReactElement['type']) {
  if (typeof type !== 'function' && typeof type !== 'object') {
    return undefined;
  }

  if (!('displayName' in type)) {
    return undefined;
  }

  const { displayName } = type;

  return typeof displayName === 'string' ? displayName : undefined;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(props, ref) {
    const [variantProps, splitRootProps] = tabs.splitVariantProps(props);
    const rootProps: ComponentPropsWithoutRef<typeof ArkTabs.Root> =
      splitRootProps;
    const { children, className, ...restProps } = rootProps;
    const styles = tabs(variantProps);
    const childArray = Children.toArray(children);
    const items = childArray.filter(isTabItemElement);
    const shouldComposeFromItems =
      childArray.length > 0 && items.length === childArray.length;

    return (
      <TabsStylesContext.Provider value={{ styles }}>
        <ArkTabs.Root
          ref={ref}
          className={cx(styles.root, className)}
          {...restProps}
        >
          {shouldComposeFromItems ? (
            <>
              <TabList>
                {items.map(({ props: itemProps }) => (
                  <TabItem
                    key={`trigger-${String(itemProps.value)}`}
                    {...itemProps}
                  />
                ))}
              </TabList>
              {items.map(({ props: itemProps }) => (
                <TabItemContent
                  key={`content-${String(itemProps.value)}`}
                  value={itemProps.value}
                >
                  {itemProps.children}
                </TabItemContent>
              ))}
            </>
          ) : (
            children
          )}
        </ArkTabs.Root>
      </TabsStylesContext.Provider>
    );
  },
);
