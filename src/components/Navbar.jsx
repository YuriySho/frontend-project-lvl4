import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      <button className="btn btn-primary" type="button">LogOut</button>
    </div>
  </nav>
);
