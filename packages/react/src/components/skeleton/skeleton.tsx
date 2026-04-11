'use client';

import { forwardRef } from 'react';
import { styled } from 'styled-system/jsx';
import { skeleton } from 'styled-system/recipes';

const StyledSkeleton = styled('div', skeleton);

export type SkeletonProps = Parameters<typeof StyledSkeleton>[0];

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { radius = 'none', 'aria-hidden': ariaHidden = true, ...props },
    ref,
  ) {
    return (
      <StyledSkeleton
        ref={ref}
        radius={radius}
        aria-hidden={ariaHidden}
        {...props}
      />
    );
  },
);
