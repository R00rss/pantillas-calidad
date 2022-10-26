import React, { useEffect, useState } from "react";
import capitalizeFirstLetterWords, {
  capitalizeFirstLetterWord,
} from "../../functions/ManageStr";
import { getSubMotivos, getInicialData } from "../../services/getInfo";
import { getLlamadas } from "../../services/searchInfo";
import { useDispatch } from "react-redux";
import { setValueCallSelected } from "../../features/call/callSelectedSlider";
import { changeSelected } from "../../features/selectionButtons/selectionButtonsSlider";

const FiltroLlamada = () => {
  const dispatch = useDispatch();
  const [cooperativas, setCooperativas] = useState([]);
  const [motivos, setMotivos] = useState([]);
  const [subMotivos, setSubMotivos] = useState([]);
  const [selected, setSelected] = useState({
    cooperativa: "",
    motivo: "",
    subMotivo: "",
    fechaI: "",
    fechaF: "",
    cedula: "",
    nombres: "",
  });
  const [resultados, setResultados] = useState([]);

  async function handleSearch() {
    console.log("handleSearch");
    console.log(selected);
    getLlamadas(selected).then((res) => {
      console.log(res);
      if (res && res.data) {
        setResultados(res.data);
      }
    });
  }
  function handleSelect(resultado) {
    console.log(resultado);
    dispatch(setValueCallSelected({ data: resultado }));
    dispatch(changeSelected({ key: "calidad" }));
  }

  useEffect(() => {
    getInicialData().then((data) => {
      if (data && data.cooperativas && data.motivos) {
        setCooperativas(data.cooperativas);
        setMotivos(data.motivos);
        setSelected({
          ...selected,
          fechaI: new Date().toISOString().slice(0, 10),
          fechaF: new Date().toISOString().slice(0, 10),
        });
      }
    });
  }, []);

  useEffect(() => {
    if (selected.motivo !== "" && selected.motivo !== "Todos") {
      getSubMotivos(selected.motivo).then((data) => {
        if (data && data.result) {
          console.log("submotivos", data.result[0]);
          console.log("selected:", selected);
          setSubMotivos(data.result);
          setSelected({ ...selected, subMotivo: data.result[0] });
        }
      });
    }
  }, [selected.motivo]);
  useEffect(() => console.log("resultados", resultados), [resultados]);

  return (
    <section className="min-h-[calc(100vh-96px)] flex flex-col gap-2 py-1 px-1 bg-[#000000]">
      <section className="flex flex-row text-slate-50 justify-center items-center bg-[#164ba8] px-3 py-2 sm:gap-3 rounded-lg">
        <form className="font-medium w-full">
          <section className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] xl:grid-cols-5 gap-3 text-slate-50 bg-[#164ba8]">
            <div className="flex flex-col">
              <label>Fecha Inicio:</label>
              <input
                className="max-h-[24px] cursor-text text-slate-900 px-2 outline-none"
                type="date"
                value={selected.fechaI}
                onChange={(e) =>
                  setSelected({ ...selected, fechaI: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label>Fecha Fin:</label>
              <input
                className="max-h-[24px] cursor-text text-slate-900 px-2 outline-none"
                type="date"
                value={selected.fechaF}
                onChange={(e) =>
                  setSelected({ ...selected, fechaF: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Cooperativa</label>
              <select
                value={selected.cooperativa}
                onChange={(e) =>
                  setSelected({ ...selected, cooperativa: e.target.value })
                }
                className="h-[24px] cursor-pointer text-slate-900 px-2 outline-none"
              >
                <option value={""}>Todas</option>
                {cooperativas.map((cooperativa, key) => (
                  <option key={key} value={cooperativa}>
                    {cooperativa}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Cédula</label>
              <input
                value={selected.cedula}
                onChange={(e) =>
                  setSelected({ ...selected, cedula: e.target.value })
                }
                className="max-h-[24px] text-slate-900 px-2 no-arrows outline-none"
                type="number"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Nombres</label>
              <input
                value={selected.nombres}
                onChange={(e) =>
                  setSelected({ ...selected, nombres: e.target.value })
                }
                className="max-h-[24px] text-slate-900 px-2 outline-none"
                type="text"
              />
            </div>
          </section>
          <section className=" flex flex-col">
            <div className="flex flex-col w-1/3">
              <label htmlFor="">Motivo de llamada</label>
              <select
                value={selected.motivo}
                onChange={(e) =>
                  setSelected({ ...selected, motivo: e.target.value })
                }
                className="h-[24px] cursor-pointer text-slate-900 px-2 outline-none"
              >
                <option value={""}>Todos</option>
                {motivos.map((motivo, key) => (
                  <option key={key} value={motivo}>
                    {motivo}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="">Submotivo</label>
              <select
                onChange={(e) =>
                  setSelected({ ...selected, subMotivo: e.target.value })
                }
                value={selected.subMotivo}
                className="h-[24px] cursor-pointer text-slate-900 px-2 outline-none"
              >
                <option value={""}>Todos</option>
                {subMotivos.map((subMotivo, key) => (
                  <option key={key} value={subMotivo}>
                    {subMotivo}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </form>
        <button
          onClick={() => handleSearch()}
          className="hover:scale-[1.01] w-40 border-none bg-[#346480] w h-9 rounded-sm sm:self-start sm:mt-5"
        >
          Buscar
        </button>
      </section>
      {resultados && resultados.length > 0 && (
        <section className="pb-5">
          <div className="gap-1 grid grid-cols-[2fr_1fr_2fr_1fr_1fr_1fr_1fr_2fr_2fr_2fr] px-3 py-1 bg-[#164ba8] text-slate-50 mx-2 rounded-t-md">
            <span className="flex justify-start items-center">Nombres</span>
            <span className="flex justify-start items-center">
              Identificación
            </span>
            <span className="flex justify-start items-center">Cooperativa</span>
            <span className="flex justify-start items-center">Agente</span>
            <span className="flex justify-start items-center">Fecha</span>
            <span className="flex justify-start items-center">
              Tipo de Gestión
            </span>
            <span className="flex justify-start items-center">Celular</span>
            <span className="flex justify-start items-center">Motivo</span>
            <span className="flex justify-start items-center">Submotivo</span>
            <span className="flex justify-start items-center">Observación</span>
          </div>

          <section className="max-h-[350px] overflow-y-auto flex flex-col mx-2 ">
            {resultados.map((resultado, i) => (
              <div
                key={i}
                className="even:bg-sky-200 odd:bg-white gap-1 grid grid-cols-[2fr_1fr_2fr_1fr_1fr_1fr_1fr_2fr_2fr_2fr] px-3 text-slate-900 rounded-b-sm"
                onClick={() => handleSelect(resultado)}
              >
                {resultado.map((item, j) => {
                  if (j < resultado.length - 1) {
                    return (
                      <span
                        className="flex justify-start items-center cursor-pointer"
                        key={j}
                      >
                        {j === 0
                          ? capitalizeFirstLetterWords(item)
                          : capitalizeFirstLetterWord(item)}
                      </span>
                    );
                  }
                })}
              </div>
            ))}
          </section>
        </section>
      )}
    </section>
  );
};

export default FiltroLlamada;
