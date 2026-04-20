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

const imgTagStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover',
};

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
              <img data-part="img" src={src} alt={alt} style={imgTagStyle} />
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
