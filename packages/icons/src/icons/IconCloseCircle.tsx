'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconCloseCircle: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconCloseCircle({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" fillRule="evenodd" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM15.4951 8.50488C15.2217 8.23155 14.7782 8.23153 14.5049 8.50488L12 11.0098L9.49512 8.50488C9.22176 8.23152 8.77825 8.23154 8.50488 8.50488C8.23152 8.77825 8.23152 9.22175 8.50488 9.49512L11.0098 12L8.50488 14.5049C8.23155 14.7782 8.23155 15.2218 8.50488 15.4951C8.77824 15.7685 9.22175 15.7685 9.49512 15.4951L12 12.9902L14.5049 15.4951C14.7783 15.7685 15.2218 15.7685 15.4951 15.4951C15.7685 15.2218 15.7685 14.7782 15.4951 14.5049L12.9902 12L15.4951 9.49512C15.7685 9.22175 15.7685 8.77825 15.4951 8.50488Z" clipRule="evenodd"/>
        </>
      </svg>
    );
  }
);

IconCloseCircle.displayName = 'IconCloseCircle';

export { IconCloseCircle };
