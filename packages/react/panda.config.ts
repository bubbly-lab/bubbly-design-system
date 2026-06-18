import { defineConfig } from '@pandacss/dev';
import {
  semanticTokens,
  textStyles,
  tokens,
} from '../design-tokens/build/panda/tokens';
import { autocompleteRecipe } from './src/recipes/autocomplete';
import { buttonRecipe } from './src/recipes/button';
import { cardHeaderRecipe } from './src/recipes/card-header';
import { dimmedRecipe } from './src/recipes/dimmed';
import { dividerRecipe } from './src/recipes/divider';
import { horizontalCardRecipe } from './src/recipes/horizontal-card';
import { iconButtonRecipe } from './src/recipes/icon-button';
import { infoItemRecipe } from './src/recipes/info-item';
import { infoListRecipe } from './src/recipes/info-list';
import { listRowRecipe } from './src/recipes/list-row';
import { loadingIndicatorRecipe } from './src/recipes/loading-indicator';
import { resultRecipe } from './src/recipes/result';
import { searchFieldRecipe } from './src/recipes/search-field';
import { sectionHeaderRecipe } from './src/recipes/section-header';
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
    // Viewport breakpoints per the Figma Foundation/Layout page (Sm 360–639,
    // Md 640–971, Lg 972–1279, Xl 1280+). Declared explicitly so responsive
    // tokens (e.g. container.padding-x) switch at the design-intended widths
    // instead of Panda's defaults (md 768 / lg 1024).
    breakpoints: {
      sm: '360px',
      md: '640px',
      lg: '972px',
      xl: '1280px',
    },
    tokens,
    semanticTokens,
    textStyles,
    keyframes: {
      'skeleton-pulse': {
        '50%': {
          opacity: 0.5,
        },
      },
      spin: {
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
    recipes: {
      autocomplete: autocompleteRecipe,
      button: buttonRecipe,
      cardHeader: cardHeaderRecipe,
      dimmed: dimmedRecipe,
      dividerLine: dividerRecipe,
      horizontalCard: horizontalCardRecipe,
      iconButton: iconButtonRecipe,
      infoItem: infoItemRecipe,
      infoList: infoListRecipe,
      listRow: listRowRecipe,
      loadingIndicator: loadingIndicatorRecipe,
      result: resultRecipe,
      searchField: searchFieldRecipe,
      sectionHeader: sectionHeaderRecipe,
      skeleton: skeletonRecipe,
      tabs: tabsRecipe,
      textButton: textButtonRecipe,
      thumbnail: thumbnailRecipe,
      verticalCard: verticalCardRecipe,
    },
  },
});
