'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconTime: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconTime({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" d="M11.7929 6.62061C12.1928 6.62061 12.5172 6.94501 12.5172 7.34493V11.7L14.8912 14.074C15.174 14.3568 15.174 14.8155 14.8912 15.0983C14.6084 15.381 14.1496 15.3811 13.8669 15.0983L11.2807 12.5122C11.145 12.3764 11.0686 12.192 11.0686 12V7.34493C11.0686 6.94507 11.3931 6.62071 11.7929 6.62061Z"/><path fill="currentColor" fillRule="evenodd" d="M12 3C16.9705 3 21 7.02955 21 12C21 16.9705 16.9705 21 12 21C7.02955 21 3 16.9705 3 12C3 7.02955 7.02955 3 12 3ZM12 4.44865C7.82939 4.44865 4.44865 7.82939 4.44865 12C4.44865 16.1706 7.82939 19.5514 12 19.5514C16.1706 19.5514 19.5514 16.1706 19.5514 12C19.5514 7.82939 16.1706 4.44865 12 4.44865Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconTime.displayName = 'IconTime';

export { IconTime };
