'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconLink: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconLink({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
    void color;
    const hasA11y = Boolean(title ?? props['aria-label'] ?? props['aria-labelledby']);

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
        <>
        <path fill="currentColor" fillRule="evenodd" d="M12.3008 6.02675C13.7915 4.53603 16.2085 4.53603 17.6992 6.02675C19.1899 7.51747 19.1899 9.9344 17.6992 11.4251L16.4438 12.6806C14.953 14.1713 12.5361 14.1713 11.0454 12.6806L10.4177 12.0528C10.175 11.8102 9.78153 11.8102 9.53885 12.0528C9.29618 12.2955 9.29618 12.689 9.53885 12.9316L10.1666 13.5594C12.1426 15.5354 15.3465 15.5354 17.3226 13.5594L18.578 12.3039C20.5541 10.3279 20.5541 7.12401 18.578 5.14794C16.6019 3.17187 13.3981 3.17187 11.422 5.14794L10.1666 6.40338C9.92389 6.64605 9.92389 7.03951 10.1666 7.28218C10.4092 7.52486 10.8027 7.52486 11.0454 7.28218L12.3008 6.02675ZM13.5562 16.4469C13.7989 16.6895 13.7989 17.083 13.5562 17.3257L12.3015 18.5804L12.3008 18.5811C10.3247 20.5572 7.12089 20.5572 5.14482 18.5811C3.16875 16.605 3.16875 13.4012 5.14482 11.4251L6.40026 10.1697C8.37633 8.19361 11.5802 8.19362 13.5562 10.1697L14.184 10.7974C14.4266 11.0401 14.4266 11.4335 14.184 11.6762C13.9413 11.9189 13.5478 11.9189 13.3052 11.6762L12.6782 11.0492C12.6779 11.049 12.6777 11.0487 12.6774 11.0485C11.1867 9.55777 8.76979 9.55777 7.27907 11.0485L6.024 12.3036C4.53327 13.7943 4.53291 16.2116 6.02363 17.7023C7.51435 19.193 9.93129 19.193 11.422 17.7023L12.6774 16.4469C12.9201 16.2042 13.3136 16.2042 13.5562 16.4469Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconLink.displayName = 'IconLink';

export { IconLink };
