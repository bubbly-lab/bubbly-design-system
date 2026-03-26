'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconChevronLeft: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconChevronLeft({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" d="M15.1953 5.50483C14.9219 5.23146 14.4784 5.23146 14.205 5.50483L8.20503 11.5048C7.93166 11.7782 7.93166 12.2217 8.20503 12.4951L14.205 18.4951C14.4784 18.7684 14.9219 18.7684 15.1953 18.4951C15.4686 18.2217 15.4686 17.7782 15.1953 17.5048L9.69038 11.9999L15.1953 6.49506C15.4686 6.2217 15.4686 5.7782 15.1953 5.50483Z"/>
      </svg>
    );
  }
);

IconChevronLeft.displayName = 'IconChevronLeft';

export { IconChevronLeft };
