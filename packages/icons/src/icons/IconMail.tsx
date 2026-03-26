'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconMail: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconMail({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        {filled ? (
          <>
            <path fill="currentColor" d="M20.7004 16.0002C20.7003 17.4913 19.4913 18.7003 18.0002 18.7004H6.00024C4.50914 18.7004 3.30015 17.4913 3.30005 16.0002V8.43286L11.6868 12.6262C11.8837 12.7247 12.1158 12.7246 12.3127 12.6262L20.7004 8.43188V16.0002Z"/><path fill="currentColor" d="M18.0002 5.30005C19.126 5.30013 20.09 5.98964 20.4954 6.96899L11.9993 11.218L3.50415 6.96997C3.90916 5.98994 4.87399 5.30005 6.00024 5.30005H18.0002Z"/>
          </>
        ) : (
          <>
            <path fill="currentColor" fillRule="evenodd" d="M18 5.30005C19.4912 5.30005 20.7002 6.50908 20.7002 8.00024V16.0002C20.7001 17.4913 19.4911 18.7004 18 18.7004H6C4.50892 18.7004 3.29991 17.4913 3.2998 16.0002V8.00024C3.2998 7.99053 3.30068 7.98064 3.30078 7.97095C3.30117 7.9615 3.30196 7.95208 3.30273 7.94263C3.33332 6.47801 4.52806 5.30007 6 5.30005H18ZM12.3135 12.6262C12.1164 12.7248 11.8836 12.7248 11.6865 12.6262L4.7002 9.13306V16.0002C4.7003 16.7181 5.28212 17.3 6 17.3H18C18.7179 17.3 19.2997 16.7181 19.2998 16.0002V9.13306L12.3135 12.6262ZM6 6.70044C5.42211 6.70046 4.93278 7.07733 4.76367 7.59888L12 11.217L19.2354 7.59888C19.0661 7.07748 18.5778 6.70044 18 6.70044H6Z" clipRule="evenodd"/>
          </>
        )}
      </svg>
    );
  }
);

IconMail.displayName = 'IconMail';

export { IconMail };
