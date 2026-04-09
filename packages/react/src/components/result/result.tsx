'use client';

import { ark } from '@ark-ui/react/factory';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';
import { styled } from 'styled-system/jsx';
import { result } from 'styled-system/recipes';

const StyledResult = styled(ark.div, result);

type StyledResultProps = Parameters<typeof StyledResult>[0];

export type ResultProps = Omit<StyledResultProps, 'children'> & {
  visualItem?: ReactNode;
  title?: string;
  description?: string;
  bottom?: ReactNode;
};

const textAreaStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '320px',
  gap: '8px',
  textAlign: 'center',
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '26px',
  color: 'var(--colors-content-neutral-strong)',
  wordBreak: 'keep-all',
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '24px',
  color: 'var(--colors-content-neutral-default)',
  wordBreak: 'keep-all',
};

export const Result = forwardRef<HTMLDivElement, ResultProps>(function Result(
  { visualItem, title, description, bottom, ...props },
  ref,
) {
  const hasTextArea = title !== undefined || description !== undefined;

  return (
    <StyledResult ref={ref} {...props}>
      {visualItem}
      {hasTextArea && (
        <div style={textAreaStyle}>
          {title !== undefined && <p style={titleStyle}>{title}</p>}
          {description !== undefined && (
            <p style={descriptionStyle}>{description}</p>
          )}
        </div>
      )}
      {bottom}
    </StyledResult>
  );
});
