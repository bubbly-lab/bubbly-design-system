'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconStar: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconStar({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" d="M10.833 2.77935C11.3098 1.81313 12.6882 1.81313 13.165 2.77935L15.4033 7.31451L20.4072 8.04107C21.4735 8.19601 21.8995 9.50675 21.1279 10.2588L17.5068 13.7881L18.3613 18.7725C18.5434 19.8344 17.4292 20.6439 16.4756 20.1426L11.999 17.7901L7.52341 20.1426C6.5697 20.644 5.45455 19.8345 5.63669 18.7725L6.49216 13.7881L2.87009 10.2588C2.09878 9.50677 2.52472 8.19613 3.5908 8.04107L8.59568 7.31451L10.833 2.77935Z"/>
      </svg>
    );
  }
);

IconStar.displayName = 'IconStar';

export { IconStar };
