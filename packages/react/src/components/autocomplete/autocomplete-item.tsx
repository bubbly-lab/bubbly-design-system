'use client';

import { forwardRef } from 'react';

import { ListRow, type ListRowProps } from '../list-row';

export type AutocompleteItemProps = ListRowProps;

export const AutocompleteItem = forwardRef<
  HTMLDivElement,
  AutocompleteItemProps
>(function AutocompleteItem(props, ref) {
  return <ListRow ref={ref} {...props} />;
});
