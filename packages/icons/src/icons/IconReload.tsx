'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconReload: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconReload({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" fillRule="evenodd" d="M12.0008 5.70078C8.52139 5.70078 5.70078 8.52139 5.70078 12.0008C5.70078 15.4802 8.52139 18.3008 12.0008 18.3008C15.2438 18.3008 17.9145 15.8497 18.2624 12.6993C18.3049 12.3149 18.6144 12.0002 19.0012 12.0004C19.3876 12.0006 19.7041 12.315 19.6695 12.6999C19.3162 16.6249 16.0177 19.7008 12.0008 19.7008C7.74819 19.7008 4.30078 16.2534 4.30078 12.0008C4.30078 7.74819 7.74819 4.30078 12.0008 4.30078C14.6045 4.30078 16.9065 5.59316 18.3 7.57143V5.7C18.3 5.3134 18.6134 5 19 5C19.3866 5 19.7 5.3134 19.7 5.7V9.7C19.7 10.0866 19.3866 10.4 19 10.4H15C14.6134 10.4 14.3 10.0866 14.3 9.7C14.3 9.3134 14.6134 9 15 9H17.5416C16.4751 7.03494 14.3937 5.70078 12.0008 5.70078Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconReload.displayName = 'IconReload';

export { IconReload };
