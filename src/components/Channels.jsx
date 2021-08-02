import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import { setActiveChannel } from '../slices/channelsInfoSlice';
import AddChannel from './modals/AddChannel.jsx';
import { Context } from '../contexts';

export default () => {
  const { handleShow } = useContext(Context);
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

  const handleActive = (id) => () => {
    dispatch(setActiveChannel({ id }));
  };

  const renderChannels = () => (
    channels ? (
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map(({ id, name }) => {
          const classActive = classnames({
            'btn-secondary text-white': id === currentChannelId,
          });
          return (
            <li key={id} className="nav-item w-100">
              <button onClick={handleActive(id)} type="button" className={`w-100 rounded-0 text-start btn ${classActive}`}>{name}</button>
            </li>
          );
        })}
      </ul>
    ) : null
  );

  return (
    <div className="col-2 h-100 px-0 pt-5 border-end bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>Channels</span>
        <button onClick={handleShow} className="p-0 text-primary btn btn-group-vertical" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      {renderChannels()}
      <AddChannel />
    </div>
  );
};
