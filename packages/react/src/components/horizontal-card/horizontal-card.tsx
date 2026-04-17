'use client';

import { ark } from '@ark-ui/react/factory';
import { forwardRef, type ReactNode } from 'react';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { horizontalCard } from 'styled-system/recipes';

const StyledHorizontalCard = styled(ark.div, horizontalCard);

type StyledHorizontalCardProps = Parameters<typeof StyledHorizontalCard>[0];

export type HorizontalCardProps = Omit<
  StyledHorizontalCardProps,
  'children'
> & {
  children?: ReactNode;
};

export const HorizontalCard = forwardRef<HTMLDivElement, HorizontalCardProps>(
  function HorizontalCard({ children, className, ...props }, ref) {
    return (
      <StyledHorizontalCard
        ref={ref}
        className={cx('group', className)}
        {...props}
      >
        {children}
      </StyledHorizontalCard>
    );
  },
);
