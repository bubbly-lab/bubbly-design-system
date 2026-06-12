import '../src/index.css';

import type { Decorator, Preview, StoryContext } from '@storybook/react';
import { createElement } from 'react';

const DARK_SURFACE = 'rgb(31 31 39)';
const LIGHT_SURFACE = '#ffffff';

interface BackgroundOption {
  name: string;
  value: string;
}

type BackgroundOptions = Record<string, BackgroundOption>;

const DEFAULT_BACKGROUND_OPTIONS: BackgroundOptions = {
  dark: { name: 'Dark', value: DARK_SURFACE },
  light: { name: 'Light', value: LIGHT_SURFACE },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getBackgroundOptions(value: unknown): BackgroundOptions {
  if (!isRecord(value) || !isRecord(value.options)) {
    return DEFAULT_BACKGROUND_OPTIONS;
  }

  return Object.entries(value.options).reduce<BackgroundOptions>(
    (options, [key, option]) => {
      if (
        isRecord(option) &&
        typeof option.name === 'string' &&
        typeof option.value === 'string'
      ) {
        options[key] = { name: option.name, value: option.value };
      }

      return options;
    },
    { ...DEFAULT_BACKGROUND_OPTIONS },
  );
}

function getSelectedBackground(context: StoryContext): string {
  const backgrounds = context.globals.backgrounds;
  const selected =
    isRecord(backgrounds) && typeof backgrounds.value === 'string'
      ? backgrounds.value
      : 'dark';

  const options = getBackgroundOptions(context.parameters.backgrounds);

  return options[selected]?.value ?? DARK_SURFACE;
}

function applyDocumentBackground(backgroundColor: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.style.backgroundColor = backgroundColor;
  document.body.style.backgroundColor = backgroundColor;

  const storybookRoot = document.getElementById('storybook-root');

  if (storybookRoot) {
    storybookRoot.style.backgroundColor = backgroundColor;
  }
}

// Composite axe color-contrast against the real surface the components are
// designed for (dark by default), not the test iframe's white body. Applied to
// the wrapper AND html/body/#storybook-root so portal-mounted Ark UI content
// (dialogs, popovers) is also evaluated on the correct background.
const withBdsSurface: Decorator = (Story, context) => {
  const backgroundColor = getSelectedBackground(context);

  applyDocumentBackground(backgroundColor);

  return createElement(
    'div',
    {
      'data-bds-story-surface': true,
      style: {
        minHeight: '100vh',
        backgroundColor,
      },
    },
    createElement(Story),
  );
};

const preview: Preview = {
  decorators: [withBdsSurface],
  parameters: {
    a11y: {
      // addon-vitest 테스트 실행 시 axe 위반을 실패로 처리 (CI 게이트).
      test: 'error',
      context: 'body',
    },
    backgrounds: {
      options: DEFAULT_BACKGROUND_OPTIONS,
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
