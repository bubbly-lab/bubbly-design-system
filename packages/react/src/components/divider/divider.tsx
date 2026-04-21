'use client';

import { forwardRef } from 'react';
import { styled } from 'styled-system/jsx';
import { dividerLine } from 'styled-system/recipes';

const StyledDivider = styled('hr', dividerLine);

export type DividerProps = Parameters<typeof StyledDivider>[0];

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { type = 'stroke', ...props },
  ref,
) {
  return <StyledDivider ref={ref} type={type} {...props} />;
});
