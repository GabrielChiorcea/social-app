import { configureStore } from '@reduxjs/toolkit';
import jokeSlice from './jocke-slice';

const store = configureStore({
  reducer: { jo: jokeSlice.reducer },
});

export default store;
