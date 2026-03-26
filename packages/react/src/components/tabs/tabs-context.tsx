'use client';

import { createContext, useContext } from 'react';
import type { tabs } from 'styled-system/recipes';

interface TabsStylesContextValue {
  styles: ReturnType<typeof tabs>;
}

export const TabsStylesContext = createContext<TabsStylesContextValue | null>(
  null,
);

export function useTabsStyles() {
  const context = useContext(TabsStylesContext);

  if (!context) {
    throw new Error('Tabs components must be used within Tabs.Root.');
  }

  return context.styles;
}
