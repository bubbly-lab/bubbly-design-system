'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconArrowDown: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconArrowDown({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" fillRule="evenodd" d="M12.495 19.4949C12.2216 19.7683 11.7784 19.7683 11.505 19.4949L7.05024 15.0402C6.77687 14.7668 6.77687 14.3236 7.05024 14.0502C7.32361 13.7768 7.76682 13.7768 8.04019 14.0502L11.3 17.31V4.99995C11.3 4.61335 11.6134 4.29995 12 4.29995C12.3866 4.29995 12.7 4.61335 12.7 4.99995V17.31L15.9598 14.0502C16.2332 13.7768 16.6764 13.7768 16.9497 14.0502C17.2231 14.3236 17.2231 14.7668 16.9497 15.0402L12.495 19.4949Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconArrowDown.displayName = 'IconArrowDown';

export { IconArrowDown };
