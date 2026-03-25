'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconHome: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconHome(
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
          d="M10.137 4.01496C11.18 3.02073 12.8196 3.02074 13.8625 4.01496L19.8625 9.73371C20.3971 10.2433 20.7004 10.9503 20.7004 11.6888V18.9993C20.7004 20.4904 19.4913 21.6994 18.0002 21.6995H15.0002C14.0614 21.6995 13.3 20.9382 13.3 19.9993V15.389C13.3 15.2234 13.1658 15.0893 13.0002 15.0892H11.0002C10.8346 15.0892 10.7004 15.2233 10.7004 15.389V19.9993C10.7004 20.9382 9.93904 21.6994 9.00024 21.6995H6.00024C4.50908 21.6995 3.30005 20.4905 3.30005 18.9993V11.6888C3.30005 10.9503 3.60242 10.2433 4.13696 9.73371L10.137 4.01496Z"
        />
      ) : (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12.897 5.02783C12.3948 4.54912 11.6052 4.54912 11.103 5.02783L5.10301 10.7473C4.84563 10.9927 4.69999 11.3327 4.69999 11.6883V18.9997C4.69999 19.7177 5.28202 20.2997 5.99999 20.2997H8.99999C9.16567 20.2997 9.29999 20.1654 9.29999 19.9997V15.389C9.29999 14.4501 10.0611 13.689 11 13.689H13C13.9389 13.689 14.7 14.4501 14.7 15.389V19.9997C14.7 20.1654 14.8343 20.2997 15 20.2997H18C18.718 20.2997 19.3 19.7177 19.3 18.9997V11.6883C19.3 11.3327 19.1543 10.9927 18.897 10.7473L12.897 5.02783ZM10.137 4.01448C11.18 3.02024 12.82 3.02024 13.8629 4.01448L19.8629 9.73399C20.3975 10.2435 20.7 10.9498 20.7 11.6883V18.9997C20.7 20.4909 19.4912 21.6997 18 21.6997H15C14.0611 21.6997 13.3 20.9386 13.3 19.9997V15.389C13.3 15.2233 13.1657 15.089 13 15.089H11C10.8343 15.089 10.7 15.2233 10.7 15.389V19.9997C10.7 20.9386 9.93887 21.6997 8.99999 21.6997H5.99999C4.50882 21.6997 3.29999 20.4909 3.29999 18.9997V11.6883C3.29999 10.9498 3.60248 10.2435 4.13703 9.73399L10.137 4.01448Z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
});

IconHome.displayName = 'IconHome';

export { IconHome };
