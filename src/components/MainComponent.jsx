import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import NotFoundPage from '../pages/NotFoundPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import Slack from '../pages/Slack.jsx';
import { AuthContext } from '../contexts';

export default () => {
  const { isAutheticated } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isAutheticated ? <Slack /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};
