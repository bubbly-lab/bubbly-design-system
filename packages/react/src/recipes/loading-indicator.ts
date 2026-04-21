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
  },
});
