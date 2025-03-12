import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { reportAccessability } from './utils/reportAccessability';

export const posthogKeys = {
  POSTHOG_API_KEY: 'phc_fFeWGpk6sJ7WiGMel95VYvrmMkqm9eDFS0i1WBdLxLz',
  POSTHOG_HOST: 'https://app.posthog.com',
};

posthog.init(posthogKeys.POSTHOG_API_KEY, {
  api_host: posthogKeys.POSTHOG_HOST,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);

reportAccessability(React);
