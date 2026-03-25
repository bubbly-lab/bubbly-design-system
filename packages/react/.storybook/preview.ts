import '../src/index.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: 'rgb(31 31 39)' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
};

export default preview;
