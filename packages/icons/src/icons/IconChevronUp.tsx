'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconChevronUp: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconChevronUp(
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
        d="M5.50501 15.795C5.23165 15.5216 5.23165 15.0781 5.50501 14.8048L11.505 8.80476C11.7784 8.53139 12.2219 8.53139 12.4952 8.80476L18.4952 14.8048C18.7686 15.0781 18.7686 15.5216 18.4952 15.795C18.2219 16.0684 17.7784 16.0684 17.505 15.795L12.0001 10.2901L6.49525 15.795C6.22188 16.0684 5.77838 16.0684 5.50501 15.795Z"
      />
    </svg>
  );
});

IconChevronUp.displayName = 'IconChevronUp';

export { IconChevronUp };
