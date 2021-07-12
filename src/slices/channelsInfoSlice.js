import { createSlice } from '@reduxjs/toolkit';

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
    addMessage: (state, { payload: { message } }) => { state.messages.push(message); },
  },
});

export const { setState, setActiveChannel, addMessage } = channelsInfoSlice.actions;

export default channelsInfoSlice.reducer;
