import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FailPage from "./pages/FailPage";
import PlantillaCalidad from "./pages/PlantillaCalidad";
import FiltroLlamada from "./pages/FiltroLlamada";

// import { history } from "./helpers/history";
const RoutesComponent = () => {
  return (
    <BrowserRouter>
      {/* <BrowserRouter history={history}> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/plantilla-calidad" element={<PlantillaCalidad />} />
        <Route path="/filtro" element={<FiltroLlamada />} />
        <Route path="*" element={<FailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
