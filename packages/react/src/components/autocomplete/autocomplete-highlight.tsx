'use client';

import type { ReactElement, ReactNode } from 'react';
import { css } from 'styled-system/css';

const highlightStyles = css({
  backgroundColor: 'transparent',
  color: 'content.brand.default',
  fontWeight: 'inherit',
});

export interface AutocompleteHighlightProps {
  children: ReactNode;
}

export function AutocompleteHighlight({
  children,
}: AutocompleteHighlightProps): ReactElement {
  return <mark className={highlightStyles}>{children}</mark>;
}
