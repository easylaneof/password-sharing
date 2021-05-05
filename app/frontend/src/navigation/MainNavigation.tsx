import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { DecryptPage, EncryptPage, GeneratePage } from 'pages';

export const MainNavigation = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/generate">
        <GeneratePage />
      </Route>

      <Route path="/encrypt">
        <EncryptPage />
      </Route>

      <Route path="/decrypt">
        <DecryptPage />
      </Route>
    </Switch>
  );
};
