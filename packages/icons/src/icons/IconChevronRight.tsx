'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconChevronRight: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconChevronRight(
  { size = '1em', filled = false, color = 'currentColor', title, ...props },
  ref,
) {
  void color;
  const hasA11y = Boolean(
    title ?? props['aria-label'] ?? props['aria-labelledby'],
  );

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
      <path
        fill="currentColor"
        d="M9.20503 5.50483C9.47839 5.23146 9.92189 5.23146 10.1953 5.50483L16.1953 11.5048C16.4686 11.7782 16.4686 12.2217 16.1953 12.4951L10.1953 18.4951C9.92189 18.7684 9.47839 18.7684 9.20503 18.4951C8.93166 18.2217 8.93166 17.7782 9.20503 17.5048L14.7099 11.9999L9.20503 6.49506C8.93166 6.2217 8.93166 5.7782 9.20503 5.50483Z"
      />
    </svg>
  );
});

IconChevronRight.displayName = 'IconChevronRight';

export { IconChevronRight };
