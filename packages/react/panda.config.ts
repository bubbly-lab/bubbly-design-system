import { defineConfig } from '@pandacss/dev';
import {
  semanticTokens,
  textStyles,
  tokens,
} from '../design-tokens/build/panda/tokens';

export default defineConfig({
  preflight: false,
  include: ['./src/**/*.{ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',
  minify: true,

  theme: {
    tokens,
    semanticTokens,
    textStyles,
  },
});
