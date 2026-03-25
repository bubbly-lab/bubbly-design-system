'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconArrowRight: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconArrowRight(
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
        d="M15.0402 7.05024L19.495 11.505C19.7683 11.7784 19.7683 12.2216 19.495 12.495L15.0402 16.9497C14.7668 17.2231 14.3236 17.2231 14.0502 16.9497C13.7769 16.6764 13.7769 16.2332 14.0502 15.9598L17.31 12.7H4.99999C4.61339 12.7 4.29999 12.3866 4.29999 12C4.29999 11.6134 4.61339 11.3 4.99999 11.3H17.31L14.0502 8.04019C13.7769 7.76682 13.7769 7.32361 14.0502 7.05024C14.3236 6.77687 14.7668 6.77687 15.0402 7.05024Z"
        clipRule="evenodd"
      />
    </svg>
  );
});

IconArrowRight.displayName = 'IconArrowRight';

export { IconArrowRight };
