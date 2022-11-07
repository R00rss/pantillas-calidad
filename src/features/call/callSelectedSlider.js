import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { data: [], prevStatus: "", currentStatus: "", statusGestion: -1 },
};

export const navbarSlice = createSlice({
  name: "callSelected",
  initialState,
  reducers: {
    setValueCallSelected: (state, action) => {
      console.log(action.payload.data);
      state.value.data = action.payload.data;
      state.value.prevStatus = action.payload.prevStatus;
      state.value.currentStatus = action.payload.currentStatus;
      state.value.currentStatus = action.payload.currentStatus;
      state.value.statusGestion = action.payload.statusGestion;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValueCallSelected } = navbarSlice.actions;

export default navbarSlice.reducer;
