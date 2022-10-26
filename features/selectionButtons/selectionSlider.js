import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    filtro: true,
    calidad: false,
  },
};

export const navbarSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    changeSelected: (state, action) => {
      Object.keys(state.value).forEach((optionKey) => {
        state.value[optionKey] = optionKey === action.payload.key;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSelected } = navbarSlice.actions;

export default navbarSlice.reducer;
