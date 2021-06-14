import React, { useEffect, useState } from 'react';

import MainComponent from './components/MainComponent.jsx';
import { AuthContext } from './contexts';

export default () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')));
  }, []);
  const isAutheticated = !!token;
  return (
    <AuthContext.Provider value={{ isAutheticated }}>
      <MainComponent />
    </AuthContext.Provider>
  );
};
