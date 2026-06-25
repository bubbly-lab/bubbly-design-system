'use client';

import { ark } from '@ark-ui/react/factory';
import {
  type CSSProperties,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { styled } from 'styled-system/jsx';
import { result } from 'styled-system/recipes';
import { Button, type ButtonProps } from '../button';

const StyledResult = styled(ark.div, result);

type StyledResultProps = Parameters<typeof StyledResult>[0];

export type ResultProps = Omit<StyledResultProps, 'children'> & {
  visualItem?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
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

// Figma: Result의 action 버튼은 항상 color=brand / type=weak / size=medium로
// 고정된다. consumer가 명시한 props는 존중하되, 누락 시 이 기본값을 주입해
// 사용처마다 props를 반복하지 않아도 시안과 일치하게 만든다.
function withResultButtonDefaults(action: ReactNode): ReactNode {
  if (!isValidElement(action) || action.type !== Button) {
    return action;
  }

  const buttonElement = action as ReactElement<ButtonProps>;
  const { color, type, size } = buttonElement.props;

  return cloneElement(buttonElement, {
    color: color ?? 'brand',
    type: type ?? 'weak',
    size: size ?? 'medium',
  });
}

export const Result = forwardRef<HTMLDivElement, ResultProps>(function Result(
  { visualItem, title, description, action, ...props },
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
      {withResultButtonDefaults(action)}
    </StyledResult>
  );
});
