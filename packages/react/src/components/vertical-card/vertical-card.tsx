'use client';

import { ark } from '@ark-ui/react/factory';
import { forwardRef, type ReactNode } from 'react';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { verticalCard } from 'styled-system/recipes';

const StyledVerticalCard = styled(ark.div, verticalCard);

type StyledVerticalCardProps = Parameters<typeof StyledVerticalCard>[0];

export type VerticalCardProps = Omit<StyledVerticalCardProps, 'children'> & {
  children?: ReactNode;
};

export const VerticalCard = forwardRef<HTMLDivElement, VerticalCardProps>(
  function VerticalCard({ children, className, ...props }, ref) {
    return (
      <StyledVerticalCard
        ref={ref}
        className={cx('group', className)}
        {...props}
      >
        {children}
      </StyledVerticalCard>
    );
  },
);
