import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { MainNavigation } from 'navigation';

import './styles/global.scss';

export const App = (): JSX.Element => {
  return (
    <Router>
      <MainNavigation />
    </Router>
  );
};
