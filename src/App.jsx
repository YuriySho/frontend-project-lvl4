import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import { Context } from './contexts';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Chat from './pages/ChatPage.jsx';
import Navbar from './components/Navbar.jsx';

export default ({ socket }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')));
  const [isAuth, setIsAuth] = useState(!!token);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')));
  }, []);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setToken(JSON.parse(localStorage.getItem('user')));
    setIsAuth(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setIsAuth(false);
  };

  return (
    <Context.Provider value={{
      token,
      socket,
      logIn,
      logOut,
      isAuth,
    }}
    >
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            {isAuth ? <Chat /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
};
