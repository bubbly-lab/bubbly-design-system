import path from 'node:path';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  fixedExtension: true,
  outDir: 'dist',
  clean: true,
  dts: true,
  platform: 'neutral',
  // Inline Panda-generated `styled-system/*` so consumers don't need it at runtime.
  alias: {
    'styled-system/css': path.resolve(
      import.meta.dirname,
      './styled-system/css/index.mjs',
    ),
    'styled-system/recipes': path.resolve(
      import.meta.dirname,
      './styled-system/recipes/index.mjs',
    ),
    'styled-system/jsx': path.resolve(
      import.meta.dirname,
      './styled-system/jsx/index.mjs',
    ),
    'styled-system/patterns': path.resolve(
      import.meta.dirname,
      './styled-system/patterns/index.mjs',
    ),
    'styled-system/tokens': path.resolve(
      import.meta.dirname,
      './styled-system/tokens/index.mjs',
    ),
    'styled-system/types': path.resolve(
      import.meta.dirname,
      './styled-system/types/index.d.ts',
    ),
  },
  deps: {
    neverBundle: ['react', 'react-dom', 'react/jsx-runtime', /@ark-ui\//],
  },
  treeshake: true,
});
