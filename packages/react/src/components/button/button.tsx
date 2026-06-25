'use client';

import { ark } from '@ark-ui/react/factory';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';
import { styled } from 'styled-system/jsx';
import { button } from 'styled-system/recipes';
import { LoadingIndicator } from '../loading-indicator';

const StyledButton = styled(ark.button, button);

type StyledButtonProps = Parameters<typeof StyledButton>[0];

type IconProps =
  | { prefixIcon?: ReactNode; suffixIcon?: never }
  | { prefixIcon?: never; suffixIcon?: ReactNode }
  | { prefixIcon?: never; suffixIcon?: never };

export type ButtonProps = Omit<StyledButtonProps, 'children'> &
  IconProps & {
    loading?: boolean;
    children: ReactNode;
  };

const iconWrapperStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--button-icon-size)',
  height: 'var(--button-icon-size)',
  flexShrink: 0,
};

const contentWrapperStyle: CSSProperties = {
  display: 'contents',
};

const hiddenContentStyle: CSSProperties = {
  display: 'contents',
  visibility: 'hidden',
};

const spinnerOverlayStyle: CSSProperties = {
  position: 'absolute',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { prefixIcon, suffixIcon, loading, disabled, children, style, ...props },
    ref,
  ) {
    return (
      <StyledButton
        ref={ref}
        disabled={disabled || loading}
        data-disabled={disabled || undefined}
        data-loading={loading || undefined}
        aria-busy={loading || undefined}
        style={{
          ...style,
          ...(loading && !disabled ? { cursor: 'default' } : {}),
        }}
        {...props}
      >
        {loading && (
          <span style={spinnerOverlayStyle} aria-hidden="true">
            <LoadingIndicator
              color="currentColor"
              size="var(--button-icon-size)"
            />
          </span>
        )}
        <span style={loading ? hiddenContentStyle : contentWrapperStyle}>
          {prefixIcon && <span style={iconWrapperStyle}>{prefixIcon}</span>}
          {children}
          {suffixIcon && <span style={iconWrapperStyle}>{suffixIcon}</span>}
        </span>
      </StyledButton>
    );
  },
);
