import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from 'lib/error-handling';
import { toast, ToastifyContainer } from 'lib/toast';

import { ThemeSwitcher } from 'components/atoms/ThemeSwitcher';

import { MainNavigation } from 'navigation';

import './styles/global.scss';

export const App = (): JSX.Element => {
  const handleError = (e: Error) => {
    toast.error(e.message);
  };

  return (
    <Router>
      <ThemeSwitcher />

      <ErrorBoundary fallback={<p>Something went wrong...</p>} onError={handleError}>
        <MainNavigation />
      </ErrorBoundary>

      <ToastifyContainer />
    </Router>
  );
};
