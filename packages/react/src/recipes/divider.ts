import { defineRecipe } from '@pandacss/dev';

export const dividerRecipe = defineRecipe({
  className: 'divider',
  base: {
    display: 'block',
    width: '100%',
    margin: 0,
    border: 'none',
    flexShrink: 0,
  },
  variants: {
    type: {
      stroke: {
        height: '1px',
        bg: 'border.neutral.default',
      },
      surface: {
        height: '12px',
        bg: 'background.default',
      },
    },
  },
  defaultVariants: {
    type: 'stroke',
  },
});
