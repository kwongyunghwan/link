import { createSlice } from '@reduxjs/toolkit';

const userInputSlice = createSlice({
  name: 'userInput',
  initialState: {
    inputValue: '',
  },
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = userInputSlice.actions; // 액션 생성 함수 내보내기
export default userInputSlice.reducer; // 리듀서 내보내기