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
          d="M12 2.25C13.0643 2.25 14.0886 2.42098 15.0474 2.73639C15.4409 2.86583 15.6208 3.30794 15.4615 3.69028C15.3021 4.07273 14.8636 4.24996 14.4682 4.12606C13.6889 3.88185 12.8599 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 11.6208 20.525 11.289 20.9029 11.2577L20.9653 11.2525C21.3781 11.2182 21.7464 11.5253 21.7498 11.9395C21.7499 11.9597 21.75 11.9798 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25Z"
          fill="currentColor"
        />
      </svg>
    </StyledLoadingIndicator>
  );
});
