'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconCheck: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconCheck({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" fillRule="evenodd" d="M20.495 6.50507C20.7683 6.77844 20.7683 7.22166 20.495 7.49502L10.495 17.495C10.2216 17.7684 9.77838 17.7684 9.50501 17.495L4.50501 12.495C4.23165 12.2217 4.23165 11.7784 4.50501 11.5051C4.77838 11.2317 5.2216 11.2317 5.49496 11.5051L9.99999 16.0101L19.505 6.50507C19.7784 6.23171 20.2216 6.23171 20.495 6.50507Z" clipRule="evenodd"/>
      </svg>
    );
  }
);

IconCheck.displayName = 'IconCheck';

export { IconCheck };
