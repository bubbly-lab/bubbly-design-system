import { defineConfig } from '@pandacss/dev';
import {
  semanticTokens,
  textStyles,
  tokens,
} from '../design-tokens/build/panda/tokens';
import { buttonRecipe } from './src/recipes/button';
import { tabsRecipe } from './src/recipes/tabs';

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
    recipes: {
      button: buttonRecipe,
      tabs: tabsRecipe,
    },
  },
});
