'use client';

import { ark } from '@ark-ui/react/factory';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';
import { styled } from 'styled-system/jsx';
import { textButton } from 'styled-system/recipes';

const StyledButton = styled(ark.button, textButton);

type StyledButtonProps = Parameters<typeof StyledButton>[0];

type IconProps =
  | { prefixIcon?: ReactNode; suffixIcon?: never }
  | { prefixIcon?: never; suffixIcon?: ReactNode }
  | { prefixIcon?: never; suffixIcon?: never };

export type TextButtonProps = Omit<StyledButtonProps, 'children'> &
  IconProps & {
    children: ReactNode;
  };

const iconWrapperStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--text-button-icon-size)',
  height: 'var(--text-button-icon-size)',
  fontSize: 'var(--text-button-icon-size)',
  flexShrink: 0,
};

const labelStyle: CSSProperties = {
  paddingInline: '2px',
};

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  function TextButton(
    { prefixIcon, suffixIcon, disabled, children, ...props },
    ref,
  ) {
    return (
      <StyledButton
        ref={ref}
        disabled={disabled}
        data-disabled={disabled || undefined}
        {...props}
      >
        {prefixIcon && <span style={iconWrapperStyle}>{prefixIcon}</span>}
        {children && <span style={labelStyle}>{children}</span>}
        {suffixIcon && <span style={iconWrapperStyle}>{suffixIcon}</span>}
      </StyledButton>
    );
  },
);
