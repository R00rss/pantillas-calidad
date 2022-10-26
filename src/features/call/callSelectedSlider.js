import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: {
  //   Nombres: "",
  //   Identificacion: "",
  //   Cooperativa: "",
  //   Agente: "",
  //   Fecha: "",
  //   TipoDeGestion: "",
  //   Celular: "",
  //   Motivo: "",
  //   SubMotivo: "",
  //   Observaciones: "",
  // },
  value: [],
};

export const navbarSlice = createSlice({
  name: "callSelected",
  initialState,
  reducers: {
    setValueCallSelected: (state, action) => {
      console.log(action.payload.data);
      state.value = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValueCallSelected } = navbarSlice.actions;

export default navbarSlice.reducer;
