// userSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isUserFirstInstall: false,
  showFullLoader: false,
};

const commonUserSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUserFirstInstall: (state, action) => {
      return {...state, isUserFirstInstall: action.payload};
    },
    showFullScreenLoader: (state, action) => {
      state.showFullLoader = action.payload;
    },
  },
});

export const {setUserFirstInstall, showFullScreenLoader} =
  commonUserSlice.actions;

export default commonUserSlice.reducer;
