import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    originalData: [],
    data: [],
  },
};

export const datosSlider = createSlice({
  name: "dataErrors",
  initialState,
  reducers: {
    setValueDataErrors: (state, action) => {
      console.log(action.payload.data);
      state.value.originalData = action.payload.data.originalData;
      state.value.data = action.payload.data.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValueDataErrors } = datosSlider.actions;

export default datosSlider.reducer;
