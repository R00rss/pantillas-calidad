import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userDataSlice = createSlice({
  name: "dataUser",
  initialState,
  reducers: {
    setValueDatosUsuario: (state, action) => {
      // console.log(action.payload.data);
      state.value = action.payload.data;
    },
  },
});

export const { setValueDatosUsuario } = userDataSlice.actions;
export default userDataSlice.reducer;
