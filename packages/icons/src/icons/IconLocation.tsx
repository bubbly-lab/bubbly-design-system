'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconLocation: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconLocation(
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
          d="M12.0002 3.30005C16.2527 3.30015 19.7004 6.74772 19.7004 11.0002C19.7004 12.3399 19.3573 13.6017 18.7542 14.7004C17.3037 17.6803 14.4646 20.3477 12.3577 21.6018C12.1371 21.7329 11.8623 21.733 11.6418 21.6018C9.53491 20.3477 6.69679 17.6802 5.24634 14.7004C4.64322 13.6017 4.30008 12.3399 4.30005 11.0002C4.30005 6.74765 7.74765 3.30005 12.0002 3.30005ZM12.0002 10.0002C11.448 10.0002 11.0002 10.448 11.0002 11.0002C11.0004 11.5524 11.448 12.0002 12.0002 12.0002C12.5523 12.0001 13.0001 11.5523 13.0002 11.0002C13.0002 10.448 12.5524 10.0004 12.0002 10.0002Z"
          clipRule="evenodd"
        />
      ) : (
        <>
          <path
            fill="currentColor"
            d="M12.0002 10.0002C12.5524 10.0004 13.0002 10.448 13.0002 11.0002C13.0001 11.5523 12.5523 12.0001 12.0002 12.0002C11.448 12.0002 11.0004 11.5524 11.0002 11.0002C11.0002 10.448 11.448 10.0002 12.0002 10.0002Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12.0002 3.30005C16.2527 3.30015 19.7004 6.74772 19.7004 11.0002C19.7004 12.3399 19.3573 13.6017 18.7542 14.7004C17.3037 17.6803 14.4646 20.3477 12.3577 21.6018C12.1371 21.7329 11.8623 21.733 11.6418 21.6018C9.53491 20.3477 6.69679 17.6802 5.24634 14.7004C4.64322 13.6017 4.30008 12.3399 4.30005 11.0002C4.30005 6.74765 7.74765 3.30005 12.0002 3.30005ZM12.0002 4.70044C8.52085 4.70044 5.70044 7.52085 5.70044 11.0002C5.70047 12.104 5.98346 13.1396 6.48071 14.0403C6.48666 14.0511 6.49195 14.0624 6.49731 14.0735C7.7262 16.608 10.1241 18.9531 12.0002 20.175C13.8763 18.9531 16.2733 16.6078 17.5022 14.0735C17.5076 14.0624 17.5138 14.0511 17.5198 14.0403C18.017 13.1396 18.3 12.104 18.3 11.0002C18.3 7.52092 15.4795 4.70055 12.0002 4.70044Z"
            clipRule="evenodd"
          />
        </>
      )}
    </svg>
  );
});

IconLocation.displayName = 'IconLocation';

export { IconLocation };
