'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconExternalLink: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconExternalLink(
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
      <path
        fill="currentColor"
        d="M11.0002 4.30005C11.3868 4.30015 11.7004 4.61371 11.7004 5.00024C11.7003 5.38669 11.3867 5.70033 11.0002 5.70044H7.00024C6.28227 5.70044 5.70044 6.28227 5.70044 7.00024V17.0002C5.70054 17.7181 6.28234 18.3 7.00024 18.3H17.0002C17.7181 18.2999 18.2999 17.7181 18.3 17.0002V13.0002C18.3 12.6136 18.6136 12.3 19.0002 12.3C19.3868 12.3002 19.7004 12.6137 19.7004 13.0002V17.0002C19.7003 18.4913 18.4913 19.7003 17.0002 19.7004H7.00024C5.50914 19.7004 4.30015 18.4913 4.30005 17.0002V7.00024C4.30005 5.50908 5.50908 4.30005 7.00024 4.30005H11.0002Z"
      />
      <path
        fill="currentColor"
        d="M18.3997 4.30005C19.1176 4.30005 19.7003 4.88197 19.7004 5.59985V8.50024C19.7003 8.88666 19.3866 9.20028 19.0002 9.20044C18.6137 9.20044 18.3002 8.88675 18.3 8.50024V6.69067L12.4954 12.4954C12.2221 12.7687 11.7785 12.7685 11.5051 12.4954C11.2318 12.222 11.2318 11.7785 11.5051 11.5051L17.3098 5.70044H15.5002C15.1137 5.70044 14.8002 5.38675 14.8 5.00024C14.8 4.61364 15.1136 4.30005 15.5002 4.30005H18.3997Z"
      />
    </svg>
  );
});

IconExternalLink.displayName = 'IconExternalLink';

export { IconExternalLink };
