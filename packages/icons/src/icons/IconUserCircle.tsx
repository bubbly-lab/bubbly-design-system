'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconUserCircle: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconUserCircle(
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
      {filled ? (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 4.44824C7.8293 4.44824 4.44824 7.8293 4.44824 12C4.44824 14.1596 5.35625 16.106 6.80957 17.4824C6.82022 17.4611 6.83003 17.4392 6.8418 17.418C7.44731 16.3274 8.39031 15.4495 9.5293 14.9229C8.6998 14.2208 8.17298 13.1718 8.17285 12C8.17309 9.88636 9.88633 8.17298 12 8.17285C14.1138 8.17285 15.8279 9.88628 15.8281 12C15.828 13.1721 15.2996 14.2208 14.4697 14.9229C15.609 15.4494 16.5526 16.3272 17.1582 17.418C17.1699 17.4391 17.1789 17.4613 17.1895 17.4824C18.6431 16.106 19.5518 14.1599 19.5518 12C19.5518 7.8293 16.1707 4.44824 12 4.44824Z"
          clipRule="evenodd"
        />
      ) : (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 15.8271C10.2197 15.8272 8.68428 16.8749 7.97363 18.3877C9.13928 19.124 10.5194 19.5518 12 19.5518C13.4803 19.5518 14.8599 19.1237 16.0254 18.3877C15.3146 16.8751 13.7802 15.8271 12 15.8271ZM12 4.44824C7.8293 4.44824 4.44824 7.8293 4.44824 12C4.44824 14.1586 5.35547 16.1042 6.80762 17.4805C7.41191 16.3603 8.36788 15.4575 9.52832 14.9209C8.69949 14.2188 8.17285 13.1713 8.17285 12C8.17286 9.88613 9.88614 8.17292 12 8.17285C14.1139 8.17285 15.8281 9.88609 15.8281 12C15.8281 13.1714 15.3006 14.2188 14.4717 14.9209C15.6319 15.4573 16.588 16.3596 17.1924 17.4795C18.6442 16.1032 19.5518 14.1584 19.5518 12C19.5518 7.8293 16.1707 4.44824 12 4.44824ZM12 9.62109C10.686 9.62116 9.6211 10.686 9.62109 12C9.62109 13.314 10.686 14.3788 12 14.3789C13.3141 14.3789 14.3799 13.3141 14.3799 12C14.3799 10.6859 13.3141 9.62109 12 9.62109Z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
});

IconUserCircle.displayName = 'IconUserCircle';

export { IconUserCircle };
