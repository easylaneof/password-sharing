import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { useDarkMode } from 'lib/dark-mode';

import { MainNavigation } from 'navigation';

import './styles/global.scss';

export const App = (): JSX.Element => {
  useDarkMode();

  return (
    <Router>
      <MainNavigation />
    </Router>
  );
};
