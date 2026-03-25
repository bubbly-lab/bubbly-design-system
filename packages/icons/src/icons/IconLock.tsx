'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconLock: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconLock(
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
          d="M12.0002 1.30005C14.0436 1.30015 15.7004 2.95686 15.7004 5.00024V8.24634C18.0843 9.55519 19.7004 12.0889 19.7004 15.0002C19.7003 19.2527 16.2527 22.7003 12.0002 22.7004C7.74772 22.7004 4.30015 19.2527 4.30005 15.0002C4.30005 12.0888 5.9162 9.55517 8.30005 8.24634V5.00024C8.30005 2.95679 9.95679 1.30005 12.0002 1.30005ZM12.0002 14.0002C11.448 14.0002 11.0002 14.448 11.0002 15.0002C11.0004 15.5524 11.448 16.0002 12.0002 16.0002C12.5523 16.0001 13.0001 15.5523 13.0002 15.0002C13.0002 14.448 12.5524 14.0004 12.0002 14.0002ZM12.0002 2.70044C10.73 2.70044 9.70044 3.72999 9.70044 5.00024V7.64966C10.4267 7.42265 11.1992 7.30005 12.0002 7.30005C12.8013 7.30007 13.5738 7.42263 14.3 7.64966V5.00024C14.3 3.73005 13.2704 2.70054 12.0002 2.70044Z"
          clipRule="evenodd"
        />
      ) : (
        <>
          <path
            fill="currentColor"
            d="M12.0002 14.0002C12.5524 14.0004 13.0002 14.448 13.0002 15.0002C13.0001 15.5524 12.5524 16.0001 12.0002 16.0002C11.448 16.0002 11.0003 15.5524 11.0002 15.0002C11.0002 14.448 11.448 14.0002 12.0002 14.0002Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12.0002 1.30005C14.0436 1.30015 15.7004 2.95686 15.7004 5.00024V8.24634C18.0841 9.55514 19.7004 12.0889 19.7004 15.0002C19.7003 19.2527 16.2527 22.7003 12.0002 22.7004C7.74772 22.7004 4.30015 19.2527 4.30005 15.0002C4.30005 12.0888 5.91621 9.5551 8.30005 8.24634V5.00024C8.30005 2.95679 9.95679 1.30005 12.0002 1.30005ZM12.0002 8.70044C8.52085 8.70044 5.70044 11.5209 5.70044 15.0002C5.70055 18.4795 8.52092 21.3 12.0002 21.3C15.4795 21.2999 18.2999 18.4795 18.3 15.0002C18.3 11.5209 15.4795 8.70055 12.0002 8.70044ZM12.0002 2.70044C10.73 2.70044 9.70044 3.72999 9.70044 5.00024V7.64868C10.4266 7.42177 11.1993 7.30005 12.0002 7.30005C12.8012 7.30007 13.5739 7.42171 14.3 7.64868V5.00024C14.3 3.73005 13.2704 2.70054 12.0002 2.70044Z"
            clipRule="evenodd"
          />
        </>
      )}
    </svg>
  );
});

IconLock.displayName = 'IconLock';

export { IconLock };
