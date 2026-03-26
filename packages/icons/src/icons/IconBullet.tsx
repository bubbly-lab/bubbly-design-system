'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconBullet: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconBullet({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    );
  }
);

IconBullet.displayName = 'IconBullet';

export { IconBullet };
