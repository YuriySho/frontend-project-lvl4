import { configureStore } from '@reduxjs/toolkit';

import channelsInfoReducer from './slices/channelsInfoSlice.js';

export default configureStore({
  reducer: { channelsInfo: channelsInfoReducer },
});
