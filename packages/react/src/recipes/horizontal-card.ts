import { defineRecipe } from '@pandacss/dev';

export const horizontalCardRecipe = defineRecipe({
  className: 'horizontal-card',
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12',
    width: '100%',
    minWidth: '0',
    '& > *': {
      flex: 1,
      minWidth: 0,
    },
    '& > :first-child': {
      flex: 'none',
    },
  },
  variants: {
    size: {
      small: {
        '& > :first-child': {
          width: '80px',
        },
      },
      medium: {
        '& > :first-child': {
          width: '96px',
        },
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
