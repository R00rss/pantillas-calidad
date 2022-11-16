import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FailPage from "./pages/FailPage";
import ManageCalidad from "./pages/ManageCalidad";
import Login from "./pages/Login";
import Test from "./pages/Test";

// import { history } from "./helpers/history";
const RoutesComponent = () => {
  return (
    <BrowserRouter>
      {/* <BrowserRouter history={history}> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<ManageCalidad />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<FailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
