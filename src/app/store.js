import { configureStore } from "@reduxjs/toolkit";
import selectButtonsNavbarReducer from "../features/selectionButtons/selectionButtonsSlider";
import callSelectedReducer from "../features/call/callSelectedSlider";
import datosSlider from "../features/datos/datosSlider";
import userDataSlider from "../features/userData/userDataSlider";
export const store = configureStore({
  reducer: {
    selection: selectButtonsNavbarReducer,
    call: callSelectedReducer,
    dataPlantilla: datosSlider,
    userData: userDataSlider,
  },
});
