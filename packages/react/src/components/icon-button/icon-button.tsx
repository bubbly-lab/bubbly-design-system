'use client';

import { ark } from '@ark-ui/react/factory';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';
import { styled } from 'styled-system/jsx';
import { iconButton } from 'styled-system/recipes';

const StyledIconButton = styled(ark.button, iconButton);

type StyledIconButtonProps = Parameters<typeof StyledIconButton>[0];

export type IconButtonProps = Omit<
  StyledIconButtonProps,
  'children' | 'aria-label'
> & {
  icon: ReactNode;
  'aria-label': string;
};

const iconWrapperStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--icon-button-icon-size)',
  height: 'var(--icon-button-icon-size)',
  fontSize: 'var(--icon-button-icon-size)',
  flexShrink: 0,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ icon, disabled, ...props }, ref) {
    return (
      <StyledIconButton
        ref={ref}
        disabled={disabled}
        data-disabled={disabled || undefined}
        {...props}
      >
        <span style={iconWrapperStyle}>{icon}</span>
      </StyledIconButton>
    );
  },
);
