/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    setState: (state, { payload: { channels, messages, currentChannelId } }) => ({
      channels: [...channels],
      messages,
      currentChannelId,
    }),
    setActiveChannel: (state, { payload: { id } }) => ({
      ...state,
      currentChannelId: id,
    }),
    addChannel: (state, { payload: { channel } }) => {
      const { id } = channel;
      state.channels.push(channel);
      state.currentChannelId = id;
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const channel = state.channels.find((el) => el.id === id);
      channel.name = name;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channel = state.channels.filter((el) => el.id !== id);
      state.message = state.message.filter((el) => el.id !== id);

      if (state.currentChannelId === id) {
        state.currentChannelId = _.first(state.channels).id;
      }
    },
    addMessage: (state, { payload: { message } }) => { state.messages.push(message); },
  },
});

export const {
  setState,
  setActiveChannel,
  addMessage,
  addChannel,
} = channelsInfoSlice.actions;

export default channelsInfoSlice.reducer;
