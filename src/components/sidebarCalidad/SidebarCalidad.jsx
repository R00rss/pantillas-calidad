import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { arrayOfObjEquals } from "../../functions/ManageObjs";
import { changeStatusPlantilla } from "../../services/plantillas";
import { saveResultados } from "../../services/saveInfo";
import simpleAlert, { confirmAlertSaveResults } from "../../utils/manageAlerts";
import { updateCurrentData } from "../../features/datos/datosSlider";
import sideBarStyle from "./sideBarStyle.module.css";
import "../../styles/sidebar/animations.css";
import { useRef } from "react";
const SidebarCalidad = () => {
  const dispatch = useDispatch();
  const buttonSave = useRef(null);
  const buttonFinish = useRef(null);
  const barSave = useRef(null);
  const barFinish = useRef(null);
  const dataToSend = useSelector((state) => state.dataPlantilla.value);
  function handleSave(data) {
    console.log(data);
    console.log(arrayOfObjEquals(data.data, data.originalData));
    if (arrayOfObjEquals(data.data, data.originalData)) {
      simpleAlert(
        "No se ha realizado ningún cambio",
        "info",
        "No hay cambios para guardar"
      );
    } else {
      const paramsAlert = [
        {
          title: "Guardar",
          message: `¿Seguro que quiere los resultados ingresados?`,
          typeOfAlert: "warning",
          buttonConfirm: "Guardar",
          buttonCancel: "Cancelar",
        },
        {
          title: "Guardado",
          message: `Se guardaron los cambios con exito`,
          typeOfAlert: "success",
          button: "Ok",
        },
        {
          title: "Error",
          message: `No se pudieron guardar los cambios`,
          typeOfAlert: "error",
          button: "Ok",
        },
        saveResultados,
        [data],
        () => dispatch(updateCurrentData()),
      ];
      confirmAlertSaveResults(...paramsAlert);
    }
  }
  function handleFinish(data) {
    if (Object.keys(data).length !== 0) {
      //si no es un objeto vacio
      if (arrayOfObjEquals(data.data, data.originalData)) {
        //si no hay cambios pendientes
        const idPlantilla = data.originalData[0].idPlantilla;
        console.log(idPlantilla);
        changeStatusPlantilla(idPlantilla, "Finalizado").then((data) => {
          console.log(data);
          if (data && "success" in data && data.success) {
            simpleAlert(
              // "Se finalizo la plantilla con éxito, clic en ok para ir al modulo de filtrado de información",
              `Plantilla  #${idPlantilla} finalizada con éxito`,
              "success",
              "Finalizado"
            );
          } else {
            simpleAlert(
              "No se pudo finalizar la plantilla, vuelva a intentarlo",
              "Error",
              "Error al finalizar la plantilla"
            );
          }
        });
      } else {
        simpleAlert(
          "Hay cambios pendientes, guarde los últimos cambios para poder finalizar la plantilla",
          "warning",
          "Cambios pendientes"
        );
      }
    }
  }
  return (
    <nav className="text-slate-50 fixed -translate-x-10 w-[150px] left-bar-sidebar">
      <ul className="flex flex-col w-full text-center py-2">
        <li
          // onMouseEnter={() => {
          //   barSave.current.classList.add("animated-sidebar-bar");
          // }}
          // onMouseLeave={() => {
          //   barSave.current.classList.remove("animated-sidebar-bar");
          // }}
          onClick={() => handleSave(dataToSend)}
          className={`${sideBarStyle.button} hover:text-[#01ffff]  ease-in-out gradientGreen cursor-pointer w-full rounded-[0_0.75rem_0_0]`}
        >
          {/* <div ref={barSave}></div> */}
          <button ref={buttonSave}>Guardar plantilla</button>
        </li>
        <li
          onClick={() => handleFinish(dataToSend)}
          // onMouseEnter={() => {
          //   barFinish.current.classList.add("animated-sidebar-bar");
          // }}
          // onMouseLeave={() => {
          //   barFinish.current.classList.remove("animated-sidebar-bar");
          // }}
          className={`${sideBarStyle.button} hover:text-[#01ffff] ease-in-out gradientGreen cursor-pointer w-full rounded-[0_0_0.75rem_0]`}
        >
          {/* <div ref={barFinish}></div> */}
          <button ref={buttonFinish}>Finalizar plantilla</button>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarCalidad;
