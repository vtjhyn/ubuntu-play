import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SystemSettingState {
  bgImage: string;
  soundLevel: number;
  brightnessLevel: number;
}

const initialState: SystemSettingState = {
  bgImage: "bg-1",
  soundLevel: Number(localStorage.getItem("soundLevel")) || 75,
  brightnessLevel: Number(localStorage.getItem("brightnessLevel")) || 100,
};

const systemSettingSlice = createSlice({
  name: "systemSetting",
  initialState,
  reducers: {
    setBgImage(state, action: PayloadAction<string>) {
      state.bgImage = action.payload;
    },
    setSoundLevel(state, action: PayloadAction<number>) {
      state.soundLevel = action.payload;
    },
    setBrightnessLevel(state, action: PayloadAction<number>) {
      state.brightnessLevel = action.payload;
    },
  },
});

export const {
  setBgImage,
  setSoundLevel,
  setBrightnessLevel,
} = systemSettingSlice.actions;

export default systemSettingSlice.reducer;
