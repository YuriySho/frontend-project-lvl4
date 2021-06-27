import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import { setActiveChannel } from '../slices/channelsInfoSlice';

export default () => {
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
        <button className="p-0 text-primary btn btn-group-vertical" type="button">+</button>
      </div>
      {renderChannels()}
    </div>
  );
};
