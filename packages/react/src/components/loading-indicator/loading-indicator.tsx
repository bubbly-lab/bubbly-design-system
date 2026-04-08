'use client';

import { type CSSProperties, forwardRef } from 'react';
import { styled } from 'styled-system/jsx';
import { loadingIndicator } from 'styled-system/recipes';

const StyledLoadingIndicator = styled('span', loadingIndicator);

export type LoadingIndicatorProps = Parameters<
  typeof StyledLoadingIndicator
>[0];

const svgStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  animation: 'spin 0.8s linear infinite',
};

// 270° arc — center (12,12), r=9.75, inset 9.38% per Figma spec
export const LoadingIndicator = forwardRef<
  HTMLSpanElement,
  LoadingIndicatorProps
>(function LoadingIndicator(props, ref) {
  return (
    <StyledLoadingIndicator
      ref={ref}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <path
          d="M12 2.25A9.75 9.75 0 1 1 2.25 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </StyledLoadingIndicator>
  );
});
