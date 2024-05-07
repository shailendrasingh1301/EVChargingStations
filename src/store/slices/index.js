import {combineReducers} from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  commonReducer: commonSlice,
  userReducer: userSlice,
});
