import type * as React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  size?: string | number;
  filled?: boolean;
  title?: string;
}
