import { defineRecipe } from '@pandacss/dev';

export const resultRecipe = defineRecipe({
  className: 'result',
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: 'sans',
    paddingBlock: '40',
    gap: '24',
  },
});
