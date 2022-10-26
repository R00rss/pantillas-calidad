import React from "react";
import Calidad from "../components/calidad/Calidad";
import FiltroLlamada from "../components/filtroLlamada/FiltroLlamada";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";

const ManageCalidad = () => {
  const selectedOption = useSelector((state) => state.selection.value);
  return (
    <Layout>
      {selectedOption.calidad && <Calidad />}
      {selectedOption.filtro && <FiltroLlamada />}
    </Layout>
  );
};

export default ManageCalidad;
