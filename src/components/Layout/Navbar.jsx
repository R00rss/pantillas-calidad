import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
import userICON from "../../assets/images/genericUser.png";
import { useSelector, useDispatch } from "react-redux";
import { changeSelected } from "../../features/selectionButtons/selectionButtonsSlider";
import { saveResultados } from "../../services/saveInfo";
import simpleAlert, { confirmAlertSaveResults } from "../../utils/manageAlerts";
import { setValueDatosUsuario } from "../../features/userData/userDataSlider";
import { arrayOfObjEquals, equalObj } from "../../functions/ManageObjs";
import { validateToken } from "../../services/token";
import { changeStatusPlantilla } from "../../services/plantillas";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCall = useSelector((state) => state.call.value);
  const dataToSend = useSelector((state) => state.dataPlantilla.value);
  const selectedOption = useSelector((state) => state.selection.value);
  const [datosUsuario, setDatosUsuario] = useState({});

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
  function handleLogOut() {
    sessionStorage.removeItem("token");
    handleClick("login");
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      validateToken(token).then((data) => {
        if (data && "success" in data && data.success) {
          dispatch(setValueDatosUsuario({ data: data?.payload }));
          setDatosUsuario(data?.payload);
        }
      });
    }
  }, []);
  useEffect(() => console.log(datosUsuario), [datosUsuario]);

  function handleClick(target) {
    navigate(`/${target}`);
  }
  return (
    <div className="sticky top-0 z-10 gradientGreen text-slate-100 font-medium w-full py-1 border-b-[1px] border-b-[#00000049]">
      {datosUsuario && (
        <ul className="flex flex-row justify-between items-center text-center w-full gap-5 text-base">
          <li className="cursor-pointer px-5 rounded-md flex justify-start items-center flex-row gap-5">
            <img className="w-[70px]" src={iconKMB2} alt="kmb icon" />
          </li>
          <li
            style={{
              borderColor: selectedOption.filtro
                ? "rgb(110 231 183)"
                : "transparent",
            }}
            className="cursor-pointer rounded-md border-[1px] p-[0.2rem_0.5rem] hover:text-[#ffffff99]"
            onClick={() => dispatch(changeSelected({ key: "filtro" }))}
          >
            <button>Filtrar Información</button>
          </li>
          {selectedCall.data && selectedCall.data.length > 0 && (
            <>
              <li
                style={{
                  borderColor: selectedOption.calidad
                    ? "rgb(110 231 183)"
                    : "transparent",
                }}
                className="cursor-pointer rounded-md border-[1px] p-[0.2rem_0.5rem] hover:text-[#ffffff99]"
                onClick={() => dispatch(changeSelected({ key: "calidad" }))}
              >
                <button>Revisar Calidad</button>
              </li>
              {/* <li className="cursor-pointer rounded-md border-[1px] p-[0.2rem_0.5rem] hover:text-[#ffffff99]">
                <button onClick={() => handleSave(dataToSend)}>
                  Guardar Plantilla
                </button>
              </li>
              <li className="cursor-pointer rounded-md border-[1px] p-[0.2rem_0.5rem] hover:text-[#ffffff99]">
                <button onClick={() => handleFinish(dataToSend)}>
                  Finalizar Plantilla
                </button>
              </li> */}
            </>
          )}
          <li className="cursor-pointer  px-5 rounded-md  flex flex-row justify-end items-center gap-4">
            <img className="w-8" src={userICON} alt="user icon" />
            <h1>{datosUsuario?.username}</h1>
            <span
              onClick={() => handleLogOut()}
              className="cursor-pointer text-4xl"
            >
              &#8628;
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
