import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import defaultTrash from "../../constant/defaultTrash";

export interface TrashItem {
  id: string;
  name: string;
  icon: string;
}

export interface TrashDataState {
  data: TrashItem[];
}

const initialState: TrashDataState = {
  data: defaultTrash,
};

const trashDataSlice = createSlice({
  name: "trashData",
  initialState,
  reducers: {
    getAllTrashItems: (state) => {
      return state;
    },
    addTrashItem: (state, action: PayloadAction<TrashItem>) => {
      state.data = [...state.data, action.payload];
    },
    restoreTrashItem: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    removeAllTrashItems: (state) => {
      state.data = [];
    },
    restoreAllTrashItems: (state) => {
      state.data = [];
    },
  },
});

export const {
  addTrashItem,
  restoreTrashItem,
  removeAllTrashItems,
  restoreAllTrashItems,
} = trashDataSlice.actions;

export default trashDataSlice.reducer;