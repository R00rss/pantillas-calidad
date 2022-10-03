import React from "react";
import Layout from "../components/Layout/Layout";
import iconKMB2 from "../assets/icons/kmbWhite.png";
import GroupItem from "../components/GroupItem";
import { toFixedIfNecessary } from "../utils/manageNumbers";
const Home = () => {
  const tableRows = [
    "Grupo Errores",
    "Item",
    "Errores no criticos",
    "Cumplimiento",
  ];
  const groupNames = [
    "Aplicar script de apertura, valor agreagado y despedida",
    "Demuestra empatía en la comunicación",
    "Demuestra empatía en la comunicación",
  ];
  const items = [
    { name: "test1", percentage: 0.5 },
    { name: "test2", percentage: 0.5 },
    { name: "test3", percentage: 0.5 },
  ];
  const Errores = [
    {
      name: "ERROR NO CRITICO",
      items: [
        {
          name: "Aplicar script de apertura, valor agreagado y despedida",
          percentage: 8,
        },
        {
          name: "Saludo corresponde al horario de la llamada recibida",
          percentage: 0,
        },
        {
          name: "Menciona de manera correcta el nombre de la Cooperativa",
          percentage: 0,
        },
        {
          name: "Personaliza el saludo (El asesor menciona su nombre y apellido)",
          percentage: 0,
        },
        {
          name: "Realiza la consulta para iniciar el requerimiento",
          percentage: 0,
        },
        {
          name: "Menciona la pregunta de valor Agregado (Algo mas en lo que le pueda asistir)",
          percentage: 0,
        },
        {
          name: "Al despedirse informa el numero telefonico para comunicarse",
          percentage: 0,
        },
        {
          name: "Agradece la comunicación e identifica de manera correcta la cooperativa",
          percentage: 0,
        },
        {
          name: "La despedida corresponde al horario de la llamada recibida",
          percentage: 0,
        },
      ],
    },
    {
      name: "ERROR NO CRITICO",
      items: [
        {
          name: "Aplicar script de apertura, valor agreagado y despedida",
          percentage: 8,
        },
        {
          name: "Saludo corresponde al horario de la llamada recibida",
          percentage: 0,
        },
        {
          name: "Menciona de manera correcta el nombre de la Cooperativa",
          percentage: 0,
        },
        {
          name: "Personaliza el saludo (El asesor menciona su nombre y apellido)",
          percentage: 0,
        },
        {
          name: "Realiza la consulta para iniciar el requerimiento",
          percentage: 0,
        },
        {
          name: "Menciona la pregunta de valor Agregado (Algo mas en lo que le pueda asistir)",
          percentage: 0,
        },
        {
          name: "Al despedirse informa el numero telefonico para comunicarse",
          percentage: 0,
        },
        {
          name: "Agradece la comunicación e identifica de manera correcta la cooperativa",
          percentage: 0,
        },
        {
          name: "La despedida corresponde al horario de la llamada recibida",
          percentage: 0,
        },
      ],
    },
  ];

  return (
    <Layout>
      <main className="w-[98%] mx-auto my-2 rounded-t-lg shadow-[10px_10px_25px_-2px_rgba(0,0,0,0.9)] ">
        <section className=" text-slate-50 grid grid-cols-3 bg-gradient-to-r from-blue-700 via-blue-900 to-gray-700 gap-5 ">
          <div className="flex justify-center items-center">
            <img className="max-h-36" src={iconKMB2} alt="kmb icon" />
          </div>
          <ul className="text-center flex flex-col justify-center items-center p-1 gap-1">
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              FECHA DE LLAMADA/MENSAJE
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">AGENTE</li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              HORA LLAMADA/MENSAJE
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              PROVEEDOR
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              REQUERIMIENTO SOLICITADO
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              COOPERATIVA
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              NÚMERO DE CÉDULA/TELÉFONO DEL CLIENTE
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              EVALUADOR
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              FECHA_MONITOREO
            </li>
            <li className="w-full p-[0.18rem_0.25rem] border-[1px]">
              RESPONSABLE_MONITOREO
            </li>
          </ul>
          <div className="flex flex-col justify-center items-center p-1 gap-1 text-slate-900">
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
            <input
              className="w-full p-[0.18rem_0.25rem] border-[1px] outline-none"
              type="text"
            />
          </div>
        </section>
        <section className="mb-2 font-medium grid grid-cols-[4fr_1fr_12fr_4fr] bg-[#070e1ada] text-slate-50">
          {tableRows.map((item, i) => (
            <div className="flex flex-col justify-center items-center" key={i}>
              {item}
            </div>
          ))}
        </section>
        {Errores.map((itemError, i) => (
          <section
            key={i}
            className="grid grid-cols-[4fr_1fr_12fr_4fr] mb-2 bg-[#164ba8] text-slate-50 text-center font-light"
          >
            <div className="flex justify-center items-center bg-slate-900 font-medium">
              {itemError.name}
            </div>
            {/* TODO unificar los 3 maps para disminuir el costo computacional */}
            <div className="flex flex-col justify-center items-center">
              {itemError.items.map((item, j) => (
                <h2
                  className={`${
                    j === 0 ? "font-medium bg-slate-900 w-full" : ""
                  }`}
                  key={j}
                >
                  {toFixedIfNecessary(i + 1 + j * 0.1, 2)}
                </h2>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center">
              {itemError.items.map((item, j) => (
                <h2
                  className={`${
                    j === 0 ? "w-full font-medium bg-slate-900" : ""
                  }`}
                  key={j}
                >
                  {item.name}
                </h2>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center">
              {itemError.items.map((item, j) => {
                return j === 0 ? (
                  <div
                    className="w-full text-center font-medium bg-slate-900"
                    key={j}
                  >
                    {item.percentage}%
                  </div>
                ) : (
                  <div key={j} className="grid grid-cols-2 w-full">
                    <input
                      className="no-arrows bg-transparent text-right outline-none"
                      type="number"
                      required
                    />
                    <span className="text-left">%</span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
};

export default Home;
