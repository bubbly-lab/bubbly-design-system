import { defineRecipe } from '@pandacss/dev';

export const dimmedRecipe = defineRecipe({
  className: 'dimmed',
  base: {
    position: 'absolute',
    inset: '0',
    display: 'block',
    pointerEvents: 'none',
    backgroundColor: '#16161bcc',
  },
  variants: {
    blur: {
      true: {
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      },
      false: {},
    },
  },
  defaultVariants: {
    blur: true,
  },
});
