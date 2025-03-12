import type { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { store } from './app/store';
import { GumbandDateProvider } from './components/common/DatePickerCalendar/gumbandDateProvider';
import { ThemeProviderWrapper } from './styles/helpers/ThemeProviderWrapper';
import { PostHogInitiator } from './views/routes/PostHogInitiator';
import { router } from './views/routes/router';
import { Toaster } from './components/Toaster';

export const App: FunctionComponent = () => (
  <GumbandDateProvider>
    <Provider store={store}>
      <ThemeProviderWrapper>
        <PostHogInitiator />
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProviderWrapper>
    </Provider>
  </GumbandDateProvider>
);
