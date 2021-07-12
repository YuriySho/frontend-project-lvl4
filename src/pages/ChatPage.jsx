import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import routes from '../routes.js';
import { setState } from '../slices/channelsInfoSlice.js';
import { Context } from '../contexts.js';

export default () => {
  const { token } = useContext(Context);
  const dispatch = useDispatch();

  const authorizationHeader = () => {
    if (token) {
      return { Authorization: `Bearer ${token.token}` };
    }
    return {};
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(routes.data(), { headers: authorizationHeader() });
        dispatch(setState(res.data));
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="container flex-grow-1 my-4 rounded shadow bg-white">
        <div className="row h-100 ">
          <Channels />
          <Messages />
        </div>
      </div>
    </>
  );
};
