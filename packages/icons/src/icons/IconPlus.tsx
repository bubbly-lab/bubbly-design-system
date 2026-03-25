'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconPlus: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconPlus(
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
        d="M12.0002 4.30005C12.3867 4.30021 12.7004 4.61374 12.7004 5.00024V11.3H19.0002C19.3868 11.3002 19.7004 11.6137 19.7004 12.0002C19.7003 12.3867 19.3867 12.7003 19.0002 12.7004H12.7004V19.0002C12.7003 19.3867 12.3866 19.7003 12.0002 19.7004C11.6137 19.7004 11.3002 19.3868 11.3 19.0002V12.7004H5.00024C4.61371 12.7004 4.30015 12.3868 4.30005 12.0002C4.30005 11.6136 4.61364 11.3 5.00024 11.3H11.3V5.00024C11.3 4.61364 11.6136 4.30005 12.0002 4.30005Z"
      />
    </svg>
  );
});

IconPlus.displayName = 'IconPlus';

export { IconPlus };
