import { defineRecipe } from '@pandacss/dev';

export const thumbnailRecipe = defineRecipe({
  className: 'thumbnail',
  base: {
    position: 'relative',
    display: 'block',
    overflow: 'clip',
    flexShrink: 0,
    isolation: 'isolate',
  },
  variants: {
    ratio: {
      '1:1': { aspectRatio: '1 / 1' },
      '3:4': { aspectRatio: '3 / 4' },
    },
    radius: {
      '8px': { borderRadius: 'r200' },
      '16px': { borderRadius: 'r400' },
      full: { borderRadius: 'full' },
    },
    border: {
      true: {
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'border.neutral.subtle',
          pointerEvents: 'none',
          zIndex: 1,
        },
      },
      false: {},
    },
    zoom: {
      true: {
        '& [data-part=img]': {
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        },
        _groupHover: {
          '& [data-part=img]': {
            transform: 'scale(1.0533)',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    ratio: '1:1',
    radius: '8px',
    border: false,
    zoom: false,
  },
});
