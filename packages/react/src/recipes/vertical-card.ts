import { defineRecipe } from '@pandacss/dev';

export const verticalCardRecipe = defineRecipe({
  className: 'vertical-card',
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12',
    width: '100%',
    minWidth: '0',
    '& > *': {
      width: '100%',
    },
  },
});
