import { combineReducers } from '@reduxjs/toolkit';
import systemModeReducer from './features/systemModeSlice';
import systemSettingReducer from './features/systemSettingSlice';
import trashDataReducer from './features/trashDataSlice';

const rootReducer = combineReducers({
  systemMode: systemModeReducer,
  systemSetting: systemSettingReducer,
  trashData: trashDataReducer,
  // tambahkan reducer lain di sini
});

export type RootStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
