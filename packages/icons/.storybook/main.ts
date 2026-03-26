import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      plugins: [react()],
    });
  },
};

export default config;
