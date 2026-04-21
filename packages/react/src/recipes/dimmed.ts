import { defineRecipe } from '@pandacss/dev';

export const dimmedRecipe = defineRecipe({
  className: 'dimmed',
  base: {
    position: 'absolute',
    inset: '0',
    display: 'block',
    pointerEvents: 'none',
    backgroundColor: 'background.overlay.default',
  },
  variants: {
    blurred: {
      true: {
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      },
      false: {},
    },
  },
  defaultVariants: {
    blurred: true,
  },
});
