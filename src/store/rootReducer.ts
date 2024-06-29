import { combineReducers } from '@reduxjs/toolkit';
import systemModeReducer from './features/systemModeSlice';

const rootReducer = combineReducers({
  systemMode: systemModeReducer,
  // tambahkan reducer lain di sini
});

export type RootStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
