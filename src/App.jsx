import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import { AuthContext } from './contexts';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Chat from './pages/ChatPage.jsx';

export default () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')));
  }, []);

  const isAutheticated = !!token;
  return (
    <AuthContext.Provider value={{ token, isAutheticated }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isAutheticated ? <Chat /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};
