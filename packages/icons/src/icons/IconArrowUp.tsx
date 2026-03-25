'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconArrowUp: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconArrowUp({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" fillRule="evenodd" d="M7.05024 8.95975L11.505 4.50498C11.7784 4.23161 12.2216 4.23161 12.495 4.50498L16.9497 8.95975C17.2231 9.23312 17.2231 9.67633 16.9497 9.9497C16.6764 10.2231 16.2332 10.2231 15.9598 9.9497L12.7 6.6899V19C12.7 19.3866 12.3866 19.7 12 19.7C11.6134 19.7 11.3 19.3866 11.3 19V6.6899L8.04019 9.9497C7.76682 10.2231 7.32361 10.2231 7.05024 9.9497C6.77687 9.67633 6.77687 9.23312 7.05024 8.95975Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconArrowUp.displayName = 'IconArrowUp';

export { IconArrowUp };
