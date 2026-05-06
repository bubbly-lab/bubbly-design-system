import { defineRecipe } from '@pandacss/dev';

export const loadingIndicatorRecipe = defineRecipe({
  className: 'loading-indicator',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'content.neutral.default',
    flexShrink: 0,
    width: '24',
    height: '24',
    '& > svg': {
      width: '100%',
      height: '100%',
      animation: 'spin 0.8s linear infinite',
    },
  },
});
