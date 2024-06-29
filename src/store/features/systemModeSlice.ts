import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SystemModeState {
  systemMode: "active" | "shutdown" | "booting" | "locked";
}

const initialState: SystemModeState = {
  systemMode: "booting",
};

const systemModeSlice = createSlice({
  name: "systemMode",
  initialState,
  reducers: {
    setSystemMode: (state, action: PayloadAction<"active" | "shutdown" | "booting" | "locked">) => {
      state.systemMode = action.payload;
    },
  },
});

export const { setSystemMode } = systemModeSlice.actions;

export default systemModeSlice.reducer;
