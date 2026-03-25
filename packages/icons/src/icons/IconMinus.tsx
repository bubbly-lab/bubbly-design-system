'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconMinus: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconMinus({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
    void color;
    const hasA11y = Boolean(title ?? props['aria-label'] ?? props['aria-labelledby']);

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden={hasA11y ? undefined : true}
        role={hasA11y ? 'img' : undefined}
        {...props}
      >
        {title && <title>{title}</title>}
        <>
        <path fill="currentColor" fillRule="evenodd" d="M4.29999 12C4.29999 11.6134 4.61339 11.3 4.99999 11.3H19C19.3866 11.3 19.7 11.6134 19.7 12C19.7 12.3866 19.3866 12.7 19 12.7H4.99999C4.61339 12.7 4.29999 12.3866 4.29999 12Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconMinus.displayName = 'IconMinus';

export { IconMinus };
