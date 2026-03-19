import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  fixedExtension: true,
  outDir: 'dist',
  clean: true,
  dts: true,
  platform: 'neutral',
  deps: {
    neverBundle: ['react', 'react-dom', 'react/jsx-runtime', /@ark-ui\//],
  },
  treeshake: true,
});
