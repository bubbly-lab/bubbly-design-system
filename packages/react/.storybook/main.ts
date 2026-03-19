import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      resolve: {
        alias: {
          'styled-system': resolve(currentDir, '../styled-system'),
        },
      },
    });
  },
};

export default config;
