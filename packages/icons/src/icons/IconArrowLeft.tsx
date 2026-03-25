'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconArrowLeft: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconArrowLeft(
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
        fillRule="evenodd"
        d="M4.50501 12.495C4.23165 12.2216 4.23165 11.7784 4.50501 11.505L8.95979 7.05024C9.23315 6.77687 9.67637 6.77687 9.94974 7.05024C10.2231 7.32361 10.2231 7.76682 9.94974 8.04019L6.68994 11.3H19C19.3866 11.3 19.7 11.6134 19.7 12C19.7 12.3866 19.3866 12.7 19 12.7H6.68994L9.94974 15.9598C10.2231 16.2332 10.2231 16.6764 9.94974 16.9497C9.67637 17.2231 9.23315 17.2231 8.95979 16.9497L4.50501 12.495Z"
        clipRule="evenodd"
      />
    </svg>
  );
});

IconArrowLeft.displayName = 'IconArrowLeft';

export { IconArrowLeft };
