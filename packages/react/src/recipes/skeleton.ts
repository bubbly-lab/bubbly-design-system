import { defineRecipe } from '@pandacss/dev';

export const skeletonRecipe = defineRecipe({
  className: 'skeleton',
  base: {
    display: 'block',
    flexShrink: 0,
    cursor: 'default',
    pointerEvents: 'none',
    userSelect: 'none',
    overflow: 'hidden',
    backgroundColor: 'surface.neutral.default',
    animation: 'skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
  variants: {
    radius: {
      none: { borderRadius: '0' },
      '4px': { borderRadius: 'r100' },
      '8px': { borderRadius: 'r200' },
      '16px': { borderRadius: 'r400' },
      full: { borderRadius: 'full' },
    },
  },
  defaultVariants: {
    radius: 'none',
  },
});
