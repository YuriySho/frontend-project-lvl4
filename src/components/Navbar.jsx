import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../contexts';

const AuthButton = () => {
  const { isAuth, logOut } = useContext(Context);

  if (isAuth) {
    return (
      <button onClick={logOut} className="btn btn-primary" type="button">LogOut</button>
    );
  }
  return null;
};

export default () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to="/">YuriySho Chat</Link>
      <AuthButton />
    </div>
  </nav>
);
