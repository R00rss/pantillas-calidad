import React from "react";
import { useNavigate } from "react-router-dom";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
import userICON from "../../assets/images/genericUser.png";
import { useSelector, useDispatch } from "react-redux";
import { changeSelected } from "../../features/selectionButtons/selectionButtonsSlider";
import { saveResultados } from "../../services/saveInfo";
import { confirmAlertSaveResults } from "../../utils/manageAlerts";
import { setValueDatosUsuario } from "../../features/userData/userDataSlider";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCall = useSelector((state) => state.call.value);
  const dataToSend = useSelector((state) => state.dataPlantilla.value);
  const selectedOption = useSelector((state) => state.selection.value);
  // const userInfo = useSelector((state) => state.userData.value);
  const userInfo = {
    username: sessionStorage.getItem("username"), //debería obtenerse del token descifrandolo mediante un servicio
    id: sessionStorage.getItem("id"),
  };

  function handleSave(data) {
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
  function handleLogOut() {
    sessionStorage.removeItem("token");
    handleClick("login");
  }

  function handleClick(target) {
    navigate(`/${target}`);
  }
  return (
    <div className="sticky top-0  bg-[#0a3853da]  text-slate-100 font-medium w-full py-2">
      {userInfo && (
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
          {selectedCall && selectedCall.length > 0 && (
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
              {/* <li className={`${basicStyles}`}> */}
              <li className="cursor-pointer rounded-md border-[1px] p-[0.2rem_0.5rem] hover:text-[#ffffff99]">
                <button onClick={() => handleSave(dataToSend)}>
                  Guardar Plantilla
                </button>
              </li>
            </>
          )}
          <li className="cursor-pointer  px-5 rounded-md  flex flex-row justify-end items-center gap-4">
            <img className="w-8" src={userICON} alt="user icon" />
            <h1>{userInfo?.username}</h1>
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
