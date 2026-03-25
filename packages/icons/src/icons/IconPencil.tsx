'use client';

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { IconProps } from '../types';

const IconPencil: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = forwardRef<SVGSVGElement, IconProps>(function IconPencil(
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
          d="M16.629 11.429C16.863 11.663 16.864 12.043 16.63 12.277L10.012 18.895C9.899 19.008 9.746 19.071 9.587 19.071L6.105 19.071C5.773 19.071 5.505 18.802 5.505 18.471V14.989C5.505 14.83 5.568 14.677 5.681 14.564L12.299 7.946C12.533 7.712 12.913 7.712 13.147 7.946L16.629 11.429ZM19.805 8.253C20.039 8.487 20.04 8.867 19.806 9.101L18.489 10.418C18.255 10.653 17.874 10.653 17.639 10.418L14.157 6.936C13.923 6.702 13.924 6.322 14.158 6.087L15.475 4.77C15.709 4.536 16.088 4.536 16.323 4.77L19.805 8.253Z"
        />
      ) : (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M19.9613 7.97488C20.5077 8.52164 20.5072 9.408 19.9606 9.95464L11.1494 18.7659C10.8894 19.0258 10.5377 19.1732 10.1702 19.176L6.60703 19.2037C6.23228 19.2064 5.8722 19.0584 5.60713 18.7935C5.34201 18.5284 5.19346 18.1678 5.19627 17.7929L5.22389 14.2297C5.22676 13.8622 5.37419 13.5104 5.63407 13.2506L14.4453 4.43935C14.992 3.89261 15.879 3.89261 16.4257 4.43935L19.9613 7.97488ZM12.6071 8.258L6.62429 14.2408L6.59667 17.8039L10.1598 17.7763L16.1426 11.7935L12.6071 8.258ZM13.5973 7.26777L17.1328 10.8033L18.971 8.96511L15.4355 5.42957L13.5973 7.26777Z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
});

IconPencil.displayName = 'IconPencil';

export { IconPencil };
