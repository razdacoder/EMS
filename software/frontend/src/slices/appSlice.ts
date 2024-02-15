import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  modal: boolean;
};

const initialState: AppState = {
  modal: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toogleModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { toogleModal } = appSlice.actions;

export default appSlice.reducer;
