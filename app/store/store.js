import { configureStore } from '@reduxjs/toolkit';
import userInputReducer from './userInputSlice';

export const store = configureStore({
  reducer: {
    userInput: userInputReducer, // 리듀서 등록
  },
});

export default store;