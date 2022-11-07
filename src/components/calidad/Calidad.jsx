import React, { useEffect, useState } from "react";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
import { useSelector, useDispatch } from "react-redux";
import { toFixedIfNecessary } from "../../utils/manageNumbers";
import {
  changeStatusPlantilla,
  getPlantillasByIdTrx,
} from "../../services/plantillas";
import { setValueDataErrors } from "../../features/datos/datosSlider";
import { getMeta } from "../../services/getInfo";
import { useRef } from "react";
import simpleAlert from "../../utils/manageAlerts";

const Calidad = () => {
  const dispatch = useDispatch();
  const textAreaBien = useRef(null);
  const textAreaDiferente = useRef(null);
  const selectedCall = useSelector((state) => state.call.value);
  const dataUser = useSelector((state) => state.userData.value);
  console.log(dataUser);
  console.log(selectedCall);
  const dataToSend = useSelector((state) => state.dataPlantilla.value);
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [resultados, setResultados] = useState({
    meta: 0,
    notaTotal: 0,
    "ERROR NO CRITICO": 0,
    "ERRORES CRÍTICOS DE NEGOCIO": 0,
    "ERROR CRITICO USUARIO FINAL": 0,
    semaforizacion: "",
    bien: "",
    diferente: "",
  });

  function generalResultados() {
    const bien = textAreaBien.current.value;
    const diferente = textAreaDiferente.current.value;
    const errorNC = toFixedIfNecessary(
      getSubTotalByTypeError("ERROR NO CRITICO")
    );
    const errorCUF = toFixedIfNecessary(
      getSubTotalByTypeError("ERROR CRITICO USUARIO FINAL")
    );
    const errorCN = toFixedIfNecessary(
      getSubTotalByTypeError("ERRORES CRÍTICOS DE NEGOCIO")
    );
    const notaTotal = toFixedIfNecessary(getNotaTotalAplica(), 2);
    const semaforizacion = semaforizacionByTotalWord(notaTotal);
    setResultados({
      ...resultados,
      notaTotal: notaTotal,
      semaforizacion: semaforizacion,
      "ERROR NO CRITICO": errorNC,
      "ERRORES CRÍTICOS DE NEGOCIO": errorCN,
      "ERROR CRITICO USUARIO FINAL": errorCUF,
      bien: bien,
      diferente: diferente,
    });
  }
  function getNotaErrorByTypeError(typeError) {
    let accMaxima = 0;
    let accActualTipo = 0;
    let accMaximaTipo = 0;
    Object.keys(items).forEach((keyItem) => {
      items[keyItem].items.forEach((item, i) => {
        if (items[keyItem].items[i].aplica === 1) {
          accMaxima += item.notaMaxima;
          if (items[keyItem].tipo == typeError) {
            accMaximaTipo += item.notaMaxima;
            accActualTipo += item.notaActual;
          }
        }
      });
    });
    return (100 * (accMaximaTipo - accActualTipo)) / accMaxima;
  }
  function getNotaTotalAplica() {
    let accNotaActualAplica = 0;
    let accNotaMaximaAplica = 0;
    let accNotaMaxima = 0;
    let accNotaActual = 0;
    Object.keys(items).forEach((groupItems) => {
      items[groupItems].items.forEach((item, i) => {
        accNotaActual += item.notaActual;
        accNotaMaxima += item.notaMaxima;
        if (items[groupItems].items[i].aplica === 1) {
          accNotaActualAplica += item.notaActual;
          accNotaMaximaAplica += item.notaMaxima;
        }
      });
    });
    console.log({
      accNotaActualAplica,
      accNotaMaximaAplica,
      accNotaMaxima,
      accNotaActual,
      notaReal: accNotaMaxima * (accNotaActualAplica / accNotaMaximaAplica),
    });

    return accNotaMaxima * (accNotaActualAplica / accNotaMaximaAplica);
  }
  function getSubTotal(groupItems) {
    let result = 0;
    items[groupItems].items.forEach((item, i) => {
      if (items[groupItems].items[i].aplica === 1) {
        result += item.notaActual;
      }
    });
    return result;
  }
  function getSubTotalByTypeError(typeError) {
    let result = 0;
    Object.keys(items).forEach((keyItem) => {
      items[keyItem].items.forEach((item) => {
        if (items[keyItem].tipo == typeError) {
          result += item.notaMaxima;
        }
      });
    });
    return result;
  }

  const titleResultados = [
    "meta por servicio",
    "calificación por tipo de error",
    "nota final",
    "diferencia",
  ];
  const tableRows = [
    "Grupo Errores",
    "Item",
    "Errores no CRÍTICOS",
    "Cumplimiento",
  ];

  function semaforizacionByTotalWord(total) {
    if (0 <= total && total < 70) return "Malo";
    if (70 <= total && total < 85) return "Regular";
    if (85 <= total && total < 89) return "Bueno";
    if (89 <= total && total <= 100) return "Excelente";
  }
  function semaforizacionByTotalColor(total) {
    if (0 <= total && total < 70) return "#821307";
    if (70 <= total && total < 85) return "#995d09";
    if (85 <= total && total < 89) return "#98bf0b";
    if (89 <= total && total <= 100) return "#075e04";
    return "white";
  }
  useEffect(() => {
    const IDTrx = selectedCall.data[selectedCall.data.length - 1];
    const IDPlantilla = selectedCall.data[selectedCall.data.length - 2];
    if (IDTrx) {
      getMeta(IDTrx).then((data) =>
        setResultados({ ...resultados, meta: toFixedIfNecessary(data.meta, 2) })
      );
      getPlantillasByIdTrx(IDTrx, dataUser.id).then((data) => {
        if (data && "result" in data) {
          setItems(data.result);
          setOriginalItems(data.result);
        }
      });
      if (selectedCall.statusGestion === 1) {
        //iniciando gestion
        if (selectedCall.prevStatus === selectedCall.currentStatus) {
          simpleAlert("Continuando con la gestión", "info", "info");
        } else {
          simpleAlert("Iniciando la gestión", "info", "info");
        }
      }
      if (selectedCall.statusGestion === 0) {
        //error, sin gestion
        simpleAlert(
          "ocurrió un error, el estado de la gestion es sin gestionar, volviendo al login",
          "error",
          "Error"
        );
        window.location.href = "/login";
      }
      if (selectedCall.statusGestion === 2) {
        //reapertura
        if (IDPlantilla) {
          changeStatusPlantilla(IDPlantilla, "En proceso").then((data) => {
            console.log(data);
            if (data && "success" in data && data.success) {
              simpleAlert(
                "Se reaperturó la gestión de la llamada",
                "info",
                "Info"
              );
            } else {
              simpleAlert(
                "No se pudo reaperturar la gestión de la llamada",
                "error",
                "Error"
              );
              window.location.href = "/login";
            }
          });
        } else {
          simpleAlert(
            "No se pudo reaperturar la gestión de la llamada",
            "error",
            "Error"
          );
          window.location.href = "/login";
        }
      }
      if (selectedCall.statusGestion === -1) {
        simpleAlert("Error inesperado, volviendo al login", "error", "Error");
        window.location.href = "/login";
      }
    } else {
      simpleAlert("Error inesperado, volviendo al login", "error", "Error");
      window.location.href = "/login";
    }
  }, []);
  useEffect(() => {
    const resultados = Object.keys(items).map(
      (keyItem) => items[keyItem].items
    );
    const resultadosOriginales = Object.keys(originalItems).map(
      (keyItem) => originalItems[keyItem].items
    );
    console.log(resultados.flat());
    console.log(resultadosOriginales.flat());
    dispatch(
      setValueDataErrors({
        data: {
          data: resultados.flat(),
          originalData: resultadosOriginales.flat(),
        },
      })
    );
  }, [items]);

  useEffect(() => console.log(items), [items]);
  useEffect(() => console.log(resultados), [resultados]);

  return (
    <section className="px-10 py-1 shadow-[10px_10px_25px_-10px_rgba(0,0,0,0.9)] bg-[#000000]">
      <section className=" text-slate-50 flex flex-row justify-center bg-gradient-to-r from-blue-700 via-blue-900 to-gray-700 gap-5 ">
        <div className="flex justify-center items-center">
          <img className="max-h-24" src={iconKMB2} alt="kmb icon" />
        </div>
        <div className="flex flex-row justify-center items-center">
          <ul className="w-[200px] text-center flex flex-col justify-center items-center p-1 gap-1 text-emerald-400">
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              Evaluador
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              Nombre Cliente
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              Identificación
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              Cooperativa
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">Agente</li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">Fecha</li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              Tipo de gestión
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">Celular</li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">Motivo</li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              SubMotivo
            </li>
          </ul>
          <ul className="text-center flex flex-col justify-center items-center p-1 gap-1 capitalize">
            <li className="w-full p-[0.18rem_0.25rem] border-[1px] border-transparent">
              {dataUser?.username}
            </li>
            {selectedCall?.data.map((item, i) => {
              if (i < selectedCall?.data.length - 3) {
                return (
                  <li
                    key={i}
                    className="w-full p-[0.18rem_0.25rem] border-[1px] border-transparent"
                  >
                    {item.toLowerCase()}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </section>
      <section className="uppercase mb-2 font-medium grid grid-cols-[4fr_1fr_12fr_4fr] bg-[#070e1ada] text-slate-50">
        {tableRows.map((item, i) => (
          <div className="flex flex-col justify-center items-center" key={i}>
            {item}
          </div>
        ))}
      </section>
      {Object.keys(items).length > 0 &&
        Object.keys(items).map((grupoItemsKey, i) => (
          <section
            key={i}
            className="grid grid-cols-[4fr_1fr_11fr_5fr] mb-2 bg-[#164ba8] text-slate-50 text-center font-light"
          >
            <div className="flex justify-center items-center bg-slate-900 font-medium border-[1px] border-[#000000]">
              {items[grupoItemsKey]?.tipo}
            </div>
            <div className="flex flex-col justify-between items-center">
              <h2 className="font-medium bg-slate-900 border-[1px] border-[#000000] w-full">
                {i + 1}
              </h2>
              {items[grupoItemsKey].items.map((item, j) => (
                <h2 className="border-[1px] border-[#000000] w-full" key={j}>
                  {toFixedIfNecessary(i + 1 + (j + 1) * 0.1, 2)}
                </h2>
              ))}
            </div>
            <div className="flex flex-col justify-between items-center">
              <h2 className="font-medium bg-slate-900 border-[1px] border-[#000000] w-full">
                {items[grupoItemsKey]?.nombre}
              </h2>
              {items[grupoItemsKey]?.items.map((item, j) => (
                <h2 className="border-[1px] border-[#000000] w-full" key={j}>
                  {item?.nombre}
                </h2>
              ))}
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="grid grid-cols-2 w-full border-[1px] bg-slate-900 font-medium  border-[#000000] px-1">
                <span className="col-start-2 text-right">
                  {toFixedIfNecessary(getSubTotal(grupoItemsKey), 2)}%
                </span>
              </div>
              {items[grupoItemsKey]?.items.map((item, j) => {
                return (
                  <div
                    key={j}
                    className="flex flex-row justify-between w-full border-[1px] border-[#000000] px-1"
                  >
                    <div data-buttons-calf className="grid grid-cols-3">
                      <button
                        onClick={() => {
                          const temp = JSON.parse(JSON.stringify(items));
                          temp[grupoItemsKey].items[j].notaActual =
                            temp[grupoItemsKey].items[j].notaMaxima;
                          setItems(temp);
                        }}
                        className={`${
                          item.aplica === 1
                            ? item.notaActual === item.notaMaxima
                              ? "bg-[#0c3274]"
                              : "bg-[#164ba8]"
                            : "bg-[#164ba8]"
                        }  text-slate-50 rounded-sm`}
                      >
                        Si
                      </button>
                      <button
                        onClick={() => {
                          const temp = JSON.parse(JSON.stringify(items));
                          temp[grupoItemsKey].items[j].notaActual = 0;
                          setItems(temp);
                        }}
                        className={`${
                          item.aplica === 1
                            ? item.notaActual !== item.notaMaxima
                              ? "bg-[#0c3274]"
                              : "bg-[#164ba8]"
                            : "bg-[#164ba8]"
                        }  text-slate-50 rounded-sm`}
                      >
                        No
                      </button>
                      <button
                        onClick={() => {
                          const temp = JSON.parse(JSON.stringify(items));
                          const aplica = temp[grupoItemsKey].items[j].aplica;
                          temp[grupoItemsKey].items[j].aplica =
                            aplica === 1 ? 0 : 1;
                          setItems(temp);
                        }}
                        className={`${
                          item.aplica === 1 ? "bg-[#164ba8]" : "bg-[#0c3274]"
                        }  text-slate-50 rounded-sm`}
                      >
                        No aplica
                      </button>
                    </div>
                    <span className="text-slate-200 text-right">
                      {toFixedIfNecessary(item.notaActual, 2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      <section className=" text-slate-50 font-light border-[1px] border-[#000000] border-b-8">
        <h1 className="bg-slate-900 text-center uppercase font-medium">
          Resultados
        </h1>
        <section className="grid grid-cols-[1fr_3fr_1fr_2fr] border-black border-t-[1px] bg-[#164ba8] text-center">
          {titleResultados.map((title, i) => (
            <h2
              key={i}
              className="uppercase bg-slate-800 border-[1px] border-black"
            >
              {title.toLowerCase()}
            </h2>
          ))}
        </section>
        <section className="grid grid-cols-[1fr_3fr_1fr_2fr] bg-slate-700">
          <div className="flex flex-col text-center ">
            <span className="bg-[#164ba8] border-[1px] border-black">Meta</span>
            <span className=" border-[1px] border-black">
              {resultados.meta}%
            </span>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <div className="w-full bg-[#164ba8] grid grid-cols-3 capitalize ">
              <span className="border-[1px] border-black">
                ERROR NO CRITICO
              </span>
              <span className="border-[1px] border-black">
                ERROR CRITICO USUARIO FINAL
              </span>
              <span className="border-[1px] border-black">
                ERROR CRITICO DEL NEGOCIO
              </span>
            </div>
            <div className="w-full grid grid-cols-3">
              <span className="border-[1px] border-black">
                {toFixedIfNecessary(
                  getNotaErrorByTypeError("ERROR NO CRITICO"),
                  2
                )}
                %
              </span>
              <span className="border-[1px] border-black">
                {toFixedIfNecessary(
                  getNotaErrorByTypeError("ERROR CRITICO USUARIO FINAL"),
                  2
                )}
                %
              </span>
              <span className="border-[1px] border-black">
                {toFixedIfNecessary(
                  getNotaErrorByTypeError("ERRORES CRÍTICOS DE NEGOCIO"),
                  2
                )}
                %
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <span className="bg-[#164ba8] w-full border-[1px] border-black">
              nota evaluación
            </span>
            <span className="w-full  border-[1px] border-black">
              {toFixedIfNecessary(getNotaTotalAplica(), 2)}%
            </span>
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <div className="w-full grid grid-cols-2 bg-[#164ba8]">
              <span className="border-[1px] border-black">
                diferencia vs meta
              </span>
              <span className="border-[1px] border-black">semaforizacion</span>
            </div>
            <div className="w-full grid grid-cols-2">
              <span className="border-[1px] border-black">
                {toFixedIfNecessary(getNotaTotalAplica() - resultados.meta, 2)}%
              </span>
              <span
                style={{
                  backgroundColor: `${semaforizacionByTotalColor(
                    toFixedIfNecessary(getNotaTotalAplica(), 2)
                  )}`,
                }}
                className="border-[1px] border-black"
              >
                {semaforizacionByTotalWord(
                  toFixedIfNecessary(getNotaTotalAplica(), 2)
                )}
              </span>
            </div>
          </div>
        </section>
      </section>
      <section className=" text-slate-50 font-light border-[1px] border-[#000000]">
        <h1 className="bg-slate-900 text-center uppercase font-medium">
          OBSERVACIONES DEL MONITOREO
        </h1>
        <section className="grid grid-cols-2 bg-[#164ba8] text-center border-black border-y-[2px]">
          <div className="w-full flex flex-col gap-1 justify-center items-center border-r-[2px] border-black">
            <label>¿Que hizo bien?</label>
            <textarea
              ref={textAreaBien}
              className="px-2 text-slate-900 rounded-md w-80 outline-none"
            ></textarea>
          </div>
          <div className="w-full flex flex-col gap-1 justify-center items-center py-2">
            <label htmlFor="">¿Qué puede hacer diferente?</label>
            <textarea
              ref={textAreaDiferente}
              className="px-2 text-slate-900 rounded-md w-80 outline-none"
            ></textarea>
          </div>
        </section>
      </section>
      <button onClick={() => generalResultados()}>get results</button>
    </section>
  );
};

export default Calidad;
