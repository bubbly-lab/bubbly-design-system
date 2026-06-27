'use client';

import { ark } from '@ark-ui/react/factory';
import { IconImgNone } from '@bubbly-design-system/icons';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';
import { styled } from 'styled-system/jsx';
import { thumbnail } from 'styled-system/recipes';
import { Skeleton } from '../skeleton';

const StyledThumbnail = styled(ark.div, thumbnail);

type StyledThumbnailProps = Parameters<typeof StyledThumbnail>[0];

export type ThumbnailProps = Omit<StyledThumbnailProps, 'children'> & {
  src?: string;
  alt?: string;
  loading?: boolean;
  children?: ReactNode;
};

// img 기본 배치(absolute/inset/cover)는 thumbnail recipe의 base에서 소유한다.
// 인라인 스타일이면 zoom의 _groupHover overscan(inset/width)을 덮어써 동작하지
// 않으므로 CSS(recipe)에 둘다.

const placeholderStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--colors-surface-neutral-strong)',
  color: 'var(--colors-content-neutral-subtle)',
  fontSize: '40px',
};

const overlayPartStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  pointerEvents: 'none',
  // backdrop-filter(Dimmed blur)는 새 stacking context를 만들어 부모의
  // overflow:clip + border-radius 클립을 모서리에서 탈출한다. overlay 슬롯
  // 자체에 둥근 모서리 클립을 걸어 자식 오버레이가 새지 않게 한다.
  borderRadius: 'inherit',
  overflow: 'clip',
};

const skeletonOverlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 3,
};

export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  function Thumbnail(
    { src, alt = '', loading = false, children, ...props },
    ref,
  ) {
    return (
      <StyledThumbnail ref={ref} {...props}>
        {loading ? (
          <Skeleton style={skeletonOverlayStyle} />
        ) : (
          <>
            {src ? (
              <img data-part="img" src={src} alt={alt} />
            ) : (
              <div
                data-part="placeholder"
                style={placeholderStyle}
                aria-hidden="true"
              >
                <IconImgNone />
              </div>
            )}
            {children != null && (
              <div data-part="overlay" style={overlayPartStyle}>
                {children}
              </div>
            )}
          </>
        )}
      </StyledThumbnail>
    );
  },
);
