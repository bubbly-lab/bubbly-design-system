'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconMenu: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconMenu({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" d="M19.164 17.3C19.626 17.3 20 17.614 20 18 20 18.387 19.626 18.7 19.164 18.7H4.836C4.374 18.7 4 18.387 4 18 4 17.614 4.374 17.3 4.836 17.3H19.164ZM19.164 11.3C19.626 11.3 20 11.614 20 12 20 12.387 19.626 12.7 19.164 12.7H4.836C4.374 12.7 4 12.387 4 12 4 11.614 4.374 11.3 4.836 11.3H19.164ZM19.164 5.3C19.626 5.3 20 5.614 20 6 20 6.387 19.626 6.7 19.164 6.7H4.836C4.374 6.7 4 6.387 4 6 4 5.614 4.374 5.3 4.836 5.3H19.164Z"/>
        </>
      </svg>
    );
  }
);

IconMenu.displayName = 'IconMenu';

export { IconMenu };
