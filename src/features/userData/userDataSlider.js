import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userDataSlice = createSlice({
  name: "dataUser",
  initialState,
  reducers: {
    setValueDatosUsuario: (state, action) => {
      console.log(state.value);
      console.log("setValueDatosUsuario, payload:", action.payload.data);
      state.value = action.payload.data;
      console.log(state.value);
    },
  },
});

export const { setValueDatosUsuario } = userDataSlice.actions;
export default userDataSlice.reducer;
