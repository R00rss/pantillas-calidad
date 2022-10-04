import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import iconKMB2 from "../assets/icons/kmbWhite.png";
import GroupItem from "../components/GroupItem";
import { toFixedIfNecessary } from "../utils/manageNumbers";
const Home = () => {
  const tableRows = [
    "Grupo Errores",
    "Item",
    "Errores no CRÍTICOS",
    "Cumplimiento",
  ];
  function calculateSubTotal(items) {
    let subTotal = 0;
    items.forEach((item, i) => {
      if (i > 0) {
        subTotal += item.percentage;
      }
    });
    return subTotal;
  }
  function updateSubTotal(items, subTotal) {
    items[0].percentage = subTotal;
    return items;
  }
  const [resultados, setResultados] = useState([
    {
      name: "Meta Por Servicio",
      items: [{ name: "Meta", percentage: 90 }],
    },
    {
      name: "CALIFICACIÓN POR TIPO DE ERROR",
      items: [
        { name: "ERROR NO CRÍTICO", percentage: 0 },
        { name: "ERROR CRÍTICO USUARIO FINAL", percentage: 0 },
        { name: "ERRORES CRÍTICOS DE NEGOCIO", percentage: 0 },
      ],
    },
    {
      name: "NOTA FINAL",
      items: [{ name: "NOTA EVALUACIÓN", percentage: 0 }],
    },
    {
      name: "Diferencia VS Meta",
      items: [
        { name: "Diferencia VS Meta", percentage: 0 },
        { name: "SEMAFORIZACIÓN DE EVALUACIÓN", percentage: 0 },
      ],
    },
  ]);
  const [observaciones, setObservaciones] = useState({
    "Que hizo bien": "",
    "Que puede mejorar": "",
  });
  const [Errores, setErrores] = useState([
    {
      name: "ERROR NO CRÍTICO",
      items: [
        {
          name: "Aplicar script de apertura, valor agregado y despedida",
          percentage: 8,
          maxPercentage: 8,
        },
        {
          name: "Saludo corresponde al horario de la llamada recibida",
          percentage: 0.75,
          maxPercentage: 0.75,
        },
        {
          name: "Menciona de manera correcta el nombre de la Cooperativa",
          percentage: 1.75,
          maxPercentage: 1.75,
        },
        {
          name: "Personaliza el saludo (El asesor menciona su nombre y apellido)",
          percentage: 0.5,
          maxPercentage: 0.5,
        },
        {
          name: "Realiza la consulta para iniciar el requerimiento",
          percentage: 0.5,
          maxPercentage: 0.5,
        },
        {
          name: "Menciona la pregunta de valor Agregado (Algo mas en lo que le pueda asistir)",
          percentage: 0.75,
          maxPercentage: 0.75,
        },
        {
          name: "Al despedirse informa el numero telefónico para comunicarse",
          percentage: 1.75,
          maxPercentage: 1.75,
        },
        {
          name: "Agradece la comunicación e identifica de manera correcta la cooperativa",
          percentage: 1.25,
          maxPercentage: 1.25,
        },
        {
          name: "La despedida corresponde al horario de la llamada recibida",
          percentage: 0.75,
          maxPercentage: 0.75,
        },
      ],
    },
    {
      name: "ERROR NO CRÍTICO",
      items: [
        {
          name: "Usa muletillas",
          percentage: 7,
          maxPercentage: 7,
        },
        {
          name: "Redundancia en la comunicación",
          percentage: 0,
          maxPercentage: 0,
        },
        {
          name: "Emplear lenguaje profesional ",
          percentage: 1.25,
          maxPercentage: 1.25,
        },
        {
          name: "Disonancias",
          percentage: 0.75,
          maxPercentage: 0.75,
        },
        {
          name: "Contaminación de la comunicación (La llamada presenta ruidos externos al servicio)",
          percentage: 0.5,
          maxPercentage: 0.5,
        },
        {
          name: "Interrumpe al cliente",
          percentage: 0,
          maxPercentage: 0,
        },
        {
          name: "Usa metamensajes",
          percentage: 1.5,
          maxPercentage: 1.5,
        },
        {
          name: "Manejar la vocalización y pronunciación adecuada",
          percentage: 0.75,
          maxPercentage: 0.75,
        },
        {
          name: "Tutear al cliente",
          percentage: 1.5,
          maxPercentage: 1.5,
        },
      ],
    },
    {
      name: "ERROR NO CRÍTICO",
      items: [
        {
          name: "Entiende la necesidad del cliente",
          percentage: 8,
          maxPercentage: 8,
        },
        {
          name: "Escucha Activa (El agente maneja una escucha activa)",
          percentage: 1.5,
          maxPercentage: 1.5,
        },
        {
          name: "Comprende el requerimiento ",
          percentage: 1.25,
          maxPercentage: 1.25,
        },
        {
          name: "Agradece por la información al socio",
          percentage: 0.8,
          maxPercentage: 0.8,
        },
        {
          name: "Promete una solución alcanzable al servicio",
          percentage: 1.25,
          maxPercentage: 1.25,
        },
        {
          name: "Ayuda con una solución alcanzable al servicio",
          percentage: 1.5,
          maxPercentage: 1.5,
        },
        {
          name: "Canaliza el requerimiento de manera de correcta",
          percentage: 1.7,
          maxPercentage: 1.7,
        },
      ],
    },
    {
      name: "ERROR NO CRÍTICO",
      items: [
        {
          name: "Presentación de alternativas (ASESORÍA)",
          percentage: 6,
          maxPercentage: 6,
        },
        {
          name: "Genera asesoría acorde al requerimiento de manera correcta",
          percentage: 2.35,
          maxPercentage: 2.35,
        },
        {
          name: "El cliente se muestra satisfecho con la asesoría brindada",
          percentage: 1.75,
          maxPercentage: 1.75,
        },
        {
          name: "La asesoría cumple con el alcance proporcionado por la cooperativa",
          percentage: 1.9,
          maxPercentage: 1.9,
        },
      ],
    },
    {
      name: "ERROR NO CRÍTICO",
      items: [
        {
          name: "Personalizar la llamada",
          percentage: 0,
          maxPercentage: 0,
        },
        {
          name: "El agente dentro de la conversación se dirige al cliente por el apellido (hasta 3 veces)",
          percentage: 0,
          maxPercentage: 0,
        },
        {
          name: "Aplica la personalización de manera correcta",
          percentage: 0,
          maxPercentage: 0,
        },
      ],
    },
    {
      name: "ERROR NO CRÍTICO",
      items: [
        {
          name: "Manejo correcto de tiempo medio de operación(TMO)",
          percentage: 6,
          maxPercentage: 6,
        },
        {
          name: "Uso correcto de los tiempos de espera (mínimo 60 segundos)",
          percentage: 1.55,
          maxPercentage: 1.55,
        },
        {
          name: "Espacios en blanco sin interacción oportuna",
          percentage: 0.9,
          maxPercentage: 0.9,
        },
        {
          name: "Habilidades de manejo de llamada y contacto con el core",
          percentage: 0.9,
          maxPercentage: 0.9,
        },
        {
          name: "Servicio activo del core durante la comunicación acorde al servicio",
          percentage: 0.7,
          maxPercentage: 0.7,
        },
        {
          name: "Tiempos empleados en el requerimiento acorde al servicio",
          percentage: 0.9,
          maxPercentage: 0.9,
        },
        {
          name: "Manejo correcto de tiempo medio hablado (TMA)",
          percentage: 1.05,
          maxPercentage: 1.05,
        },
      ],
    },
    {
      name: "ERROR NO CRÍTICO",
      items: [
        {
          name: "Protocolo de comunicación  (Encuesta de satisfacción)",
          percentage: 2,
          maxPercentage: 2,
        },
        {
          name: "Tipifica de manera correcta la calificación y el comentario ",
          percentage: 2,
          maxPercentage: 2,
        },
      ],
    },
    {
      name: "ERROR CRÍTICO USUARIO FINAL",
      items: [
        {
          name: "Validación de datos correctos ",
          percentage: 11.6,
          maxPercentage: 11.6,
        },
        {
          name: "Aplica script de validación de datos de manera correcta",
          percentage: 2.3,
          maxPercentage: 2.3,
        },
        {
          name: "Cumple con el proceso de validación de datos (básica,media,avanzada)",
          percentage: 2.5,
          maxPercentage: 2.5,
        },
        {
          name: "Usa de manera correcta el core para la validación",
          percentage: 2.05,
          maxPercentage: 2.05,
        },
        {
          name: "Script de cierre de validación aplicado de manera correcta(Exitoso o No exitoso)",
          percentage: 1.75,
          maxPercentage: 1.75,
        },
        {
          name: "Script de No pasa validación",
          percentage: 1.5,
          maxPercentage: 1.5,
        },
        {
          name: "Script de pasa validación",
          percentage: 1.5,
          maxPercentage: 1.5,
        },
      ],
    },
    {
      name: "ERROR CRÍTICO USUARIO FINAL",
      items: [
        {
          name: "Maltrato al cliente",
          percentage: 12,
          maxPercentage: 12,
        },
        {
          name: "Mal uso de frases",
          percentage: 1.7,
          maxPercentage: 1.7,
        },
        {
          name: "Uso inadecuado de conectores de comunicación",
          percentage: 0.81,
          maxPercentage: 0.81,
        },
        {
          name: "Uso de idiotismo y sobredimensionar la comunicación",
          percentage: 1.3,
          maxPercentage: 1.3,
        },
        {
          name: "Palabras Soeces",
          percentage: 0.99,
          maxPercentage: 0.99,
        },
        {
          name: "Lenguaje coloquial",
          percentage: 1.2,
          maxPercentage: 1.2,
        },
        {
          name: "Mal uso de tecnicismos",
          percentage: 2.5,
          maxPercentage: 2.5,
        },
        {
          name: "Confusión de cooperativas",
          percentage: 3.5,
          maxPercentage: 3.5,
        },
      ],
    },
    {
      name: "ERRORES CRÍTICOS DE NEGOCIO",
      items: [
        {
          name: "Escalamiento ",
          percentage: 12.25,
          maxPercentage: 12.25,
        },
        {
          name: "Envió de correos acorde al proceso",
          percentage: 3.25,
          maxPercentage: 3.25,
        },
        {
          name: "Redacción del requerimiento de manera correcta acorde al proceso",
          percentage: 2.9,
          maxPercentage: 2.9,
        },
        {
          name: "Gestión de escalamiento acorde al proceso",
          percentage: 3.05,
          maxPercentage: 3.05,
        },
        {
          name: "Seguimiento y conclusión del requerimiento de acuerdo al alcance del servicio",
          percentage: 3.05,
          maxPercentage: 3.05,
        },
      ],
    },
    {
      name: "ERRORES CRÍTICOS DE NEGOCIO",
      items: [
        {
          name: "Registro de información acorde al servicio",
          percentage: 20.15,
          maxPercentage: 20.15,
        },
        {
          name: "Ingreso de datos al Front de manera correcta",
          percentage: 3.45,
          maxPercentage: 3.45,
        },
        {
          name: "Calidad de datos registrados acorde al servicio",
          percentage: 2.9,
          maxPercentage: 2.9,
        },
        {
          name: "Numero de requerimientos ingresados acorde a lo solicitado por el cliente",
          percentage: 2.9,
          maxPercentage: 2.9,
        },
        {
          name: "Ingreso de respaldos acorde al servicio",
          percentage: 3.33,
          maxPercentage: 3.33,
        },
        {
          name: "Tipifica de manera correcta los comentarios en el campo de observaciones",
          percentage: 2.33,
          maxPercentage: 2.33,
        },
        {
          name: "Identifica de manera correcta el canal por el cual ingresó el requerimiento",
          percentage: 1.98,
          maxPercentage: 1.98,
        },
        {
          name: "Identifica y registra de manera correcta el  motivo de la transacción o requerimiento",
          percentage: 3.26,
          maxPercentage: 3.26,
        },
      ],
    },
    {
      name: "ERRORES CRÍTICOS DE NEGOCIO",
      items: [
        {
          name: "Registro de información acorde al servicio",
          percentage: 20.15,
          maxPercentage: 20.15,
        },
        {
          name: "Ingreso de datos al Front de manera correcta",
          percentage: 3.45,
          maxPercentage: 3.45,
        },
        {
          name: "Calidad de datos registrados acorde al servicio",
          percentage: 2.9,
          maxPercentage: 2.9,
        },
        {
          name: "Numero de requerimientos ingresados acorde a lo solicitado por el cliente",
          percentage: 2.9,
          maxPercentage: 2.9,
        },
        {
          name: "Ingreso de respaldos acorde al servicio",
          percentage: 3.33,
          maxPercentage: 3.33,
        },
        {
          name: "Tipifica de manera correcta los comentarios en el campo de observaciones",
          percentage: 2.33,
          maxPercentage: 2.33,
        },
        {
          name: "Identifica de manera correcta el canal por el cual ingresó el requerimiento",
          percentage: 1.98,
          maxPercentage: 1.98,
        },
        {
          name: "Identifica y registra de manera correcta el  motivo de la transacción o requerimiento",
          percentage: 3.26,
          maxPercentage: 3.26,
        },
      ],
    },
  ]);

  function semaforizacion(total) {
    if (0 <= total < 70) return "Malo";
    if (70 <= total < 85) return "Regular";
    if (85 <= total < 89) return "Bueno";
    if (89 <= total < 100) return "Excelente";
  }
  useEffect(() => {
    const keys = [
      "ERROR NO CRÍTICO",
      "ERROR CRÍTICO USUARIO FINAL",
      "ERRORES CRÍTICOS DE NEGOCIO",
    ];
    const subtotal = {
      "ERROR NO CRÍTICO": 0,
      "ERROR CRÍTICO USUARIO FINAL": 0,
      "ERRORES CRÍTICOS DE NEGOCIO": 0,
    };
    const tempResultados = [...resultados];
    Errores.forEach((Error) => {
      if (Error.name === keys[0]) {
        subtotal[keys[0]] += Error.items[0].percentage;
      }
      if (Error.name === keys[1]) {
        subtotal[keys[1]] += Error.items[0].percentage;
      }
      if (Error.name === keys[2]) {
        subtotal[keys[2]] += Error.items[0].percentage;
      }
    });
    tempResultados[1].items[0].percentage = toFixedIfNecessary(
      subtotal[keys[0]]
    );
    tempResultados[1].items[1].percentage = toFixedIfNecessary(
      subtotal[keys[1]]
    );
    tempResultados[1].items[2].percentage = toFixedIfNecessary(
      subtotal[keys[2]]
    );
    tempResultados[2].items[0].percentage = toFixedIfNecessary(
      subtotal[keys[0]] + subtotal[keys[1]] + subtotal[keys[2]],
      2
    );
    tempResultados[3].items[0].percentage = toFixedIfNecessary(
      tempResultados[0].items[0].percentage -
        tempResultados[2].items[0].percentage,
      2
    );
    tempResultados[3].items[1].percentage = semaforizacion(
      tempResultados[2].items[0].percentage
    );
    console.log(tempResultados[2].items[0].percentage);
    console.log(semaforizacion(tempResultados[2].items[0].percentage));
    setResultados(tempResultados);
  }, [Errores]);

  return (
    <Layout>
      <main className="w-[98%] mx-auto my-2 shadow-[10px_10px_25px_-10px_rgba(0,0,0,0.9)] bg-[#000000]">
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
        <section className="uppercase mb-2 font-medium grid grid-cols-[4fr_1fr_12fr_4fr] bg-[#070e1ada] text-slate-50">
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
            <div className="flex justify-center items-center bg-slate-900 font-medium border-[1px] border-[#000000]">
              {itemError.name}
            </div>
            {/* TODO unificar los 3 maps para disminuir el costo computacional */}
            <div className="flex flex-col justify-between items-center">
              {itemError.items.map((item, j) => (
                <h2
                  className={`${
                    j === 0 ? "font-medium bg-slate-900" : ""
                  }  border-[1px] border-[#000000] w-full`}
                  key={j}
                >
                  {toFixedIfNecessary(i + 1 + j * 0.1, 2)}
                </h2>
              ))}
            </div>
            <div className="flex flex-col justify-between items-center">
              {itemError.items.map((item, j) => (
                <h2
                  className={`${
                    j === 0 ? "font-medium bg-slate-900" : ""
                  } border-[1px] border-[#000000] w-full`}
                  key={j}
                >
                  {item.name}
                </h2>
              ))}
            </div>
            <div className="flex flex-col justify-between items-center">
              {itemError.items.map((item, j) => {
                return j === 0 ? (
                  <div
                    key={j}
                    // className="w-full text-center font-medium bg-slate-900 border-[1px] border-[#000000]"
                    className="grid grid-cols-2 w-full border-[1px] bg-slate-900 font-medium  border-[#000000] px-1"
                  >
                    <span className="col-start-2 text-right">
                      {/* {toFixedIfNecessary(
                        calculateSubTotal(itemError.items),
                        2
                      )} */}
                      {item.percentage}%
                    </span>
                  </div>
                ) : (
                  <div
                    key={j}
                    className="grid grid-cols-2 w-full border-[1px] border-[#000000] px-1"
                  >
                    <div data-buttons-calf className="grid grid-cols-2">
                      <button
                        onClick={() => {
                          const temp = [...Errores];
                          temp[i].items[j].percentage =
                            temp[i].items[j].maxPercentage;
                          temp[i].items[0].percentage = calculateSubTotal(
                            temp[i].items
                          );
                          setErrores(temp);
                        }}
                        className={`${
                          Errores[i].items[j].percentage === 0
                            ? "bg-[#164ba8]"
                            : "bg-[#0c3274]"
                        }  text-slate-50 rounded-sm`}
                      >
                        Si
                      </button>
                      <button
                        onClick={() => {
                          const temp = [...Errores];
                          temp[i].items[j].percentage = 0;
                          temp[i].items[0].percentage = calculateSubTotal(
                            temp[i].items
                          );
                          setErrores(temp);
                        }}
                        className={`${
                          Errores[i].items[j].percentage ===
                          Errores[i].items[j].maxPercentage
                            ? "bg-[#164ba8]"
                            : "bg-[#0c3274]"
                        }  text-slate-50 rounded-sm`}
                      >
                        No
                      </button>
                    </div>
                    <span className="text-slate-200 text-right">
                      {item.percentage} %
                    </span>
                    {/* <div className="flex flex-row">
                      <span className="w-1/2 text-left">%</span>
                      <span className="w-1/2 text-left">
                        {item.percentage} %
                      </span>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <section className=" text-slate-50 font-light border-[1px] border-[#000000]">
          <h1 className="bg-slate-900 text-center uppercase font-medium">
            Resultados
          </h1>
          <section className="grid grid-cols-[1fr_3fr_1fr_2fr] border-black border-t-[1px] bg-[#164ba8] text-center">
            {resultados.map((resultado, i) => (
              <div key={i} className="first-line:">
                <h2 className="uppercase bg-slate-600 border-[1px] border-black">
                  {resultado.name}
                </h2>
                <div
                  className={`grid grid-cols-${resultado.items.length} uppercase`}
                >
                  {resultado.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex flex-col justify-center items-center border-[1px] border-black"
                    >
                      <div className="w-full border-b-2 border-black">
                        {item.name}
                      </div>
                      {console.log(j)}
                      {console.log(resultado.items.length - 1)}
                      <div className="w-full uppercase">
                        {typeof item.percentage === "string"
                          ? `${item.percentage}`
                          : `${item.percentage}%`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
