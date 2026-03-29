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

export type TabsListProps = ComponentPropsWithoutRef<typeof ArkTabs.List>;

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof ArkTabs.Trigger>;

export type TabsContentProps = ComponentPropsWithoutRef<typeof ArkTabs.Content>;

export const List = forwardRef<HTMLDivElement, TabsListProps>(function List(
  { children, className, ...props },
  ref,
) {
  const styles = useTabsStyles();

  return (
    <ArkTabs.List ref={ref} className={cx(styles.list, className)} {...props}>
      {children}
      <ArkTabs.Indicator className={styles.indicator} />
    </ArkTabs.List>
  );
});

export const Content = forwardRef<HTMLDivElement, TabsContentProps>(
  function Content({ className, ...props }, ref) {
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

export interface TabsRootProps
  extends ComponentPropsWithoutRef<typeof ArkTabs.Root>,
    TabsVariantProps {
  children?: ReactNode;
  value?: TabsTriggerProps['value'];
  defaultValue?: TabsTriggerProps['value'];
}

function isTabItemElement(
  child: ReactNode,
): child is ReactElement<TabItemProps> {
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

export const Root = forwardRef<HTMLDivElement, TabsRootProps>(
  function Root(props, ref) {
    const [variantProps, splitRootProps] = tabs.splitVariantProps(props);
    const rootProps: ComponentPropsWithoutRef<typeof ArkTabs.Root> =
      splitRootProps;
    const { children, className, ...restProps } = rootProps;
    const styles = tabs(variantProps);
    const childArray = Children.toArray(children);
    const tabItems = childArray.filter(isTabItemElement);
    const shouldComposeFromTabItems =
      childArray.length > 0 && tabItems.length === childArray.length;

    return (
      <TabsStylesContext.Provider value={{ styles }}>
        <ArkTabs.Root
          ref={ref}
          className={cx(styles.root, className)}
          {...restProps}
        >
          {shouldComposeFromTabItems ? (
            <>
              <List>
                {tabItems.map(({ props: itemProps }) => (
                  <TabItem
                    key={`trigger-${String(itemProps.value)}`}
                    {...itemProps}
                  />
                ))}
              </List>
              {tabItems.map(({ props: itemProps }) => (
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
