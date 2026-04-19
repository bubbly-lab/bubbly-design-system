'use client';

import { forwardRef } from 'react';
import { styled } from 'styled-system/jsx';
import { dimmed } from 'styled-system/recipes';

const StyledDimmed = styled('div', dimmed);

export type DimmedProps = Parameters<typeof StyledDimmed>[0];

export const Dimmed = forwardRef<HTMLDivElement, DimmedProps>(function Dimmed(
  { 'aria-hidden': ariaHidden = true, ...props },
  ref,
) {
  return <StyledDimmed ref={ref} aria-hidden={ariaHidden} {...props} />;
});
