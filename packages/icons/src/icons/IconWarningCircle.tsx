'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconWarningCircle: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconWarningCircle({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" d="M12 14.7C12.552 14.701 13 15.148 13 15.7 13 16.253 12.552 16.7 12 16.7 11.448 16.7 11.001 16.253 11 15.7 11 15.148 11.448 14.7 12 14.7ZM12 7C12.387 7 12.7 7.371 12.7 7.829V12.571C12.7 13.029 12.387 13.4 12 13.4 11.614 13.4 11.3 13.029 11.3 12.571V7.829C11.3 7.371 11.614 7 12 7Z"/><path fill="currentColor" fillRule="evenodd" d="M12.0002 2.30005C17.3573 2.30015 21.7004 6.64315 21.7004 12.0002C21.7003 17.3573 17.3573 21.7003 12.0002 21.7004C6.64315 21.7004 2.30015 17.3573 2.30005 12.0002C2.30005 6.64308 6.64308 2.30005 12.0002 2.30005ZM12.0002 3.70044C7.41628 3.70044 3.70044 7.41628 3.70044 12.0002C3.70055 16.5841 7.41635 20.3 12.0002 20.3C16.5841 20.2999 20.2999 16.5841 20.3 12.0002C20.3 7.41635 16.5841 3.70055 12.0002 3.70044Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconWarningCircle.displayName = 'IconWarningCircle';

export { IconWarningCircle };
