import React from 'react';
import { useSelector } from 'react-redux';

import InputForm from './InputForm.jsx';

export default () => {
  const { channels, messages, currentChannelId } = useSelector((state) => state.channelsInfo);

  const renderMessages = () => (
    <div id="message-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelId }) => channelId === currentChannelId)
        .map(({ id, body, username }) => {
          const message = `${username}: ${body}`;
          return (
            <div key={id}>{message}</div>
          );
        })}
    </div>
  );

  const renderCurrentChannel = () => {
    const currentChannel = channels.find(({ id }) => id === currentChannelId);
    if (!currentChannel) {
      return null;
    }

    const countMessage = messages.filter(({ channelId }) => +channelId === currentChannelId).length;
    return (
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{currentChannel.name}</b></p>
        <span className="text-muted">
          <span>{countMessage}</span>
          <span> message</span>
        </span>
      </div>
    );
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {renderCurrentChannel()}
        {renderMessages()}
        <InputForm />
      </div>
    </div>
  );
};
