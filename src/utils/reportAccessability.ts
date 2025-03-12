import type React from 'react';

export const reportAccessability = async (
  App: typeof React,
  config?: Record<string, unknown>
): Promise<void> => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const axe = await import('@axe-core/react');
    const ReactDOM = await import('react-dom');

    axe.default(App, ReactDOM, 1000, config);
  }
};
