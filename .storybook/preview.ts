import type { Preview } from '@storybook/react';
import '../src/styles/base.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Michael Pflueger Portfolio', 'Design System'],
      },
    },
  },
};

export default preview;
