'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconImgNone: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconImgNone({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" fillRule="evenodd" d="M3.50507 3.50507C3.77844 3.23171 4.22166 3.23171 4.49502 3.50507L20.495 19.5051C20.7684 19.7784 20.7684 20.2217 20.495 20.495C20.2217 20.7684 19.7784 20.7684 19.5051 20.495L3.50507 4.49502C3.23171 4.22166 3.23171 3.77844 3.50507 3.50507ZM4.49502 7.46292C4.05405 7.02194 3.30005 7.33426 3.30005 7.95789V17C3.30005 18.4912 4.50888 19.7 6.00005 19.7H15.0422C15.6658 19.7 15.9782 18.946 15.5372 18.5051C15.4059 18.3738 15.2279 18.3 15.0422 18.3H6.00005C5.92506 18.3 5.85155 18.2937 5.78003 18.2815L10.439 14.6814C10.8203 14.3867 10.8562 13.8242 10.5155 13.4834C10.3122 13.2801 9.98945 13.2595 9.76193 13.4353L4.7389 17.3167C4.71352 17.2154 4.70005 17.1093 4.70005 17V7.95789C4.70005 7.77224 4.6263 7.59419 4.49502 7.46292ZM19.5051 16.5333C19.3738 16.402 19.3 16.2239 19.3 16.0383V12.8484L16.7989 10.9725C16.3311 10.6217 15.6867 10.6264 15.224 10.9839L14.9959 11.1601C14.7173 11.3755 14.322 11.3502 14.0729 11.1012C13.7746 10.8028 13.806 10.3103 14.1399 10.0523L14.368 9.87608C15.3289 9.13354 16.6674 9.12391 17.6389 9.85255L19.3 11.0984V7.00005C19.3 6.28208 18.718 5.70005 18 5.70005H8.9618C8.77615 5.70005 8.5981 5.6263 8.46683 5.49502C8.02585 5.05405 8.33817 4.30005 8.9618 4.30005H18C19.4912 4.30005 20.7001 5.50888 20.7001 7.00005V12.4659C20.7011 12.4883 20.7011 12.5107 20.7001 12.5332V16.0383C20.7001 16.6619 19.9461 16.9742 19.5051 16.5333Z" clipRule="evenodd"/>
      </svg>
    );
  }
);

IconImgNone.displayName = 'IconImgNone';

export { IconImgNone };
