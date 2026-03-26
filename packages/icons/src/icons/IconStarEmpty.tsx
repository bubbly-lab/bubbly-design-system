'use client';

import { forwardRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { IconProps } from '../types';

const IconStarEmpty: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef<SVGSVGElement, IconProps>(
  function IconStarEmpty({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
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
        <path fill="currentColor" fillOpacity=".5" fillRule="evenodd" d="M13.1649 2.77935C12.6881 1.81313 11.3103 1.81313 10.8334 2.77935L8.5954 7.31407L3.59105 8.04124C2.52476 8.19618 2.099 9.50655 2.87057 10.2586L6.49175 13.7884L5.63691 18.7726C5.45476 19.8345 6.56943 20.6444 7.52314 20.143L11.9992 17.7898L16.4752 20.143C17.4289 20.6444 18.5436 19.8345 18.3614 18.7726L17.5066 13.7884L21.1278 10.2586C21.8993 9.50655 21.4736 8.19618 20.4073 8.04124L15.4029 7.31407L13.1649 2.77935Z" clipRule="evenodd"/>
      </svg>
    );
  }
);

IconStarEmpty.displayName = 'IconStarEmpty';

export { IconStarEmpty };
