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

export const datosSlider = createSlice({
  name: "dataErrors",
  initialState,
  reducers: {
    setValueDataErrors: (state, action) => {
      console.log(action.payload.data);
      state.value = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValueDataErrors } = datosSlider.actions;

export default datosSlider.reducer;
