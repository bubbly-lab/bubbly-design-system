import '../src/index.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    a11y: {
      // addon-vitest 테스트 실행 시 axe 위반을 실패로 처리 (CI 게이트).
      test: 'error',
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: 'rgb(31 31 39)' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '812px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Design Tokens', 'Components'],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  tags: ['autodocs'],
};

export default preview;
