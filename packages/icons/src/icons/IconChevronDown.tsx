'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconChevronDown: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconChevronDown({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" d="M5.50501 8.80476C5.23165 9.07812 5.23165 9.52162 5.50501 9.79499L11.505 15.795C11.7784 16.0684 12.2219 16.0684 12.4952 15.795L18.4952 9.79499C18.7686 9.52162 18.7686 9.07812 18.4952 8.80476C18.2219 8.53139 17.7784 8.53139 17.505 8.80476L12.0001 14.3096L6.49525 8.80476C6.22188 8.53139 5.77838 8.53139 5.50501 8.80476Z"/>
        </>
      </svg>
    );
  }
);

IconChevronDown.displayName = 'IconChevronDown';

export { IconChevronDown };
