import { combineReducers } from '@reduxjs/toolkit';
import systemModeReducer from './features/systemModeSlice';
import systemSettingReducer from './features/systemSettingSlice';

const rootReducer = combineReducers({
  systemMode: systemModeReducer,
  systemSetting: systemSettingReducer,
  // tambahkan reducer lain di sini
});

export type RootStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
