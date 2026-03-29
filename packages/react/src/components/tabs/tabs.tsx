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
  ITEM_DISPLAY_NAME,
  Item,
  ItemContent,
  type ItemContentProps,
  type ItemProps,
} from './tab-item';
import { TabsStylesContext, useTabsStyles } from './tabs-context';

export { Item, ItemContent };
export type { ItemContentProps, ItemProps };

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

function isItemElement(child: ReactNode): child is ReactElement<ItemProps> {
  if (!isValidElement(child)) {
    return false;
  }

  if (child.type === Item) {
    return true;
  }

  if (typeof child.type === 'string') {
    return false;
  }

  return getElementDisplayName(child.type) === ITEM_DISPLAY_NAME;
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
    const items = childArray.filter(isItemElement);
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
              <List>
                {items.map(({ props: itemProps }) => (
                  <Item
                    key={`trigger-${String(itemProps.value)}`}
                    {...itemProps}
                  />
                ))}
              </List>
              {items.map(({ props: itemProps }) => (
                <ItemContent
                  key={`content-${String(itemProps.value)}`}
                  value={itemProps.value}
                >
                  {itemProps.children}
                </ItemContent>
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
