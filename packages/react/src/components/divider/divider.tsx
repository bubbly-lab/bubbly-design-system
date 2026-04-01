'use client';

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  forwardRef,
} from 'react';

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  type?: 'stroke' | 'surface';
}

const BASE_STYLE: CSSProperties = {
  display: 'block',
  width: '100%',
  margin: 0,
  border: 'none',
  flexShrink: 0,
};

const STROKE_STYLE: CSSProperties = {
  height: '1px',
  backgroundColor: 'var(--colors-border-neutral-default, #373744)',
};

const SURFACE_STYLE: CSSProperties = {
  height: '12px',
  backgroundColor: 'var(--colors-background-default, #16161b)',
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { type = 'stroke', style, ...props },
  ref,
) {
  return (
    <hr
      ref={ref}
      style={{
        ...BASE_STYLE,
        ...(type === 'surface' ? SURFACE_STYLE : STROKE_STYLE),
        ...style,
      }}
      {...props}
    />
  );
});
