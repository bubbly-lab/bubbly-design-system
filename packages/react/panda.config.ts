import { defineConfig } from '@pandacss/dev';
import {
  semanticTokens,
  textStyles,
  tokens,
} from '../design-tokens/build/panda/tokens';
import { buttonRecipe } from './src/recipes/button';
import { cardHeaderRecipe } from './src/recipes/card-header';
import { dividerRecipe } from './src/recipes/divider';
import { iconButtonRecipe } from './src/recipes/icon-button';
import { loadingIndicatorRecipe } from './src/recipes/loading-indicator';
import { resultRecipe } from './src/recipes/result';
import { skeletonRecipe } from './src/recipes/skeleton';
import { tabsRecipe } from './src/recipes/tabs';
import { textButtonRecipe } from './src/recipes/text-button';
import { thumbnailRecipe } from './src/recipes/thumbnail';
import { verticalCardRecipe } from './src/recipes/vertical-card';

export default defineConfig({
  preflight: false,
  include: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',
  minify: true,
  staticCss: {
    recipes: '*',
  },

  theme: {
    tokens,
    semanticTokens,
    textStyles,
    keyframes: {
      'skeleton-pulse': {
        '50%': {
          opacity: 0.5,
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      cardHeader: cardHeaderRecipe,
      divider: dividerRecipe,
      iconButton: iconButtonRecipe,
      loadingIndicator: loadingIndicatorRecipe,
      result: resultRecipe,
      skeleton: skeletonRecipe,
      tabs: tabsRecipe,
      textButton: textButtonRecipe,
      thumbnail: thumbnailRecipe,
      verticalCard: verticalCardRecipe,
    },
  },
});
