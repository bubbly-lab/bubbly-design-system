'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconKebab: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconKebab(
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
        d="M12 17.5C12.828 17.5 13.5 18.172 13.5 19 13.5 19.828 12.828 20.5 12 20.5 11.172 20.5 10.5 19.828 10.5 19 10.5 18.172 11.172 17.5 12 17.5ZM12 10.5C12.828 10.5 13.5 11.172 13.5 12 13.5 12.828 12.828 13.5 12 13.5 11.172 13.5 10.5 12.828 10.5 12 10.5 11.172 11.172 10.5 12 10.5ZM12 3.5C12.828 3.5 13.5 4.172 13.5 5 13.5 5.828 12.828 6.5 12 6.5 11.172 6.5 10.5 5.828 10.5 5 10.5 4.172 11.172 3.5 12 3.5Z"
      />
    </svg>
  );
});

IconKebab.displayName = 'IconKebab';

export { IconKebab };
