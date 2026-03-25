'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconClose: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconClose(
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
        d="M16.505 6.50507C16.7784 6.23171 17.2219 6.23171 17.4952 6.50507C17.7685 6.77845 17.7686 7.22199 17.4952 7.49531L12.9904 12.0002L17.4952 16.5051C17.7684 16.7785 17.7685 17.222 17.4952 17.4953C17.2219 17.7686 16.7784 17.7685 16.505 17.4953L12.0001 12.9904L7.49525 17.4953C7.22193 17.7686 6.77838 17.7685 6.50501 17.4953C6.23166 17.222 6.23169 16.7784 6.50501 16.5051L11.0099 12.0002L6.50501 7.49531C6.23165 7.22194 6.23165 6.77844 6.50501 6.50507C6.77838 6.23171 7.22188 6.23171 7.49525 6.50507L12.0001 11.01L16.505 6.50507Z"
      />
    </svg>
  );
});

IconClose.displayName = 'IconClose';

export { IconClose };
