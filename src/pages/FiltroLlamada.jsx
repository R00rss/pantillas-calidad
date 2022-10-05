import React from "react";
import Layout from "../components/Layout/Layout";

const FiltroLlamada = () => {
  return (
    <Layout>
      <main className="h-[calc(100vh-136px)] flex flex-col gap-2">
        <section className="flex flex-col sm:flex-row text-slate-50 justify-center items-center bg-[#164ba8] px-3 py-1 sm:gap-3">
          <form className="w-full grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] xl:grid-cols-[3fr_2fr_2fr_2fr_2fr_2fr] gap-3 text-slate-50 bg-[#164ba8]">
            <div className="flex flex-col">
              <label htmlFor="">Fecha</label>
              <div className="ml-2 flex flex-col gap-1">
                <div className="flex flex-col xl:flex-row justify-between">
                  <label>Fecha Inicio:</label>
                  <input
                    className="max-h-[24px] text-slate-900 px-2 outline-none"
                    type="date"
                  />
                </div>
                <div className="flex flex-col xl:flex-row justify-between">
                  <label>Fecha Fin:</label>
                  <input
                    className="max-h-[24px] text-slate-900 px-2 outline-none"
                    type="date"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Cooperativa</label>
              <select
                className="max-h-[24px] text-slate-900 px-2 outline-none"
                name=""
                id=""
              >
                <option value="">item</option>
                <option value="">item2</option>
                <option value="">item3</option>
                <option value="">item4</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="">Cédula</label>
              <input
                className="max-h-[24px] text-slate-900 px-2 no-arrows outline-none"
                type="number"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Nombres</label>
              <input
                className="max-h-[24px] text-slate-900 px-2 outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Motivo de llamada</label>
              <select
                className="max-h-[24px] text-slate-900 px-2 outline-none"
                name=""
                id=""
              >
                <option value="">item</option>
                <option value="">item2</option>
                <option value="">item3</option>
                <option value="">item4</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Submotivo</label>
              <select
                className="max-h-[24px] text-slate-900 px-2 outline-none"
                name=""
                id=""
              >
                <option value="">item</option>
                <option value="">item2</option>
                <option value="">item3</option>
                <option value="">item4</option>
              </select>
            </div>
            <div className="flex justify-center items-center"></div>
          </form>
          <button className="w-40 border-none bg-black w h-9 rounded-sm sm:self-start sm:mt-5">
            Buscar
          </button>
        </section>

        <section>
          <div className="grid grid-cols-10 px-3 bg-black text-slate-50 mx-2 rounded-t-sm">
            <h2>Nombres</h2>
            <h2>Identificación</h2>
            <h2>Cooperativa</h2>
            <h2>Agente</h2>
            <h2>Fecha</h2>
            <h2>Tipo de Gestión</h2>
            <h2>Celular</h2>
            <h2>Motivo</h2>
            <h2>Submotivo</h2>
            <h2>Observación</h2>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default FiltroLlamada;
