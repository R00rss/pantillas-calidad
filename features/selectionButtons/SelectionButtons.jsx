import React, { useState } from "react";

const SelectionButtons = (callback) => {
  const basicStyles = "rounded-lg p-[0.25rem_0.75rem] ";
  const active = "rounded-lg p-[0.25rem_0.75rem] text-[#ffffff]";
  const inactive = "rounded-lg p-[0.25rem_0.75rem] bg-transparent ";
  const [flagsOptions, setFlagsOptions] = useState({
    dashboard: true,
    processing: false,
  });
  function changeFlags(key, container, setContainer) {
    const temp = { ...container };
    Object.keys(temp).forEach(
      (optionKey) => (temp[optionKey] = optionKey === key)
    );
    callback(key);
    setContainer(temp);
  }
  return (
    // <div className="rounded-2xl bg-slate-100 p-1 font-semibold flex flex-row gap-2 justify-center items-center">
    <div className="rounded-2xl border-[#20475efd] text-[#56778afd] border-[1px] p-1 font-medium flex flex-row gap-2 justify-center items-center">
      <button
        onClick={() => changeFlags("calidad", flagsOptions, setFlagsOptions)}
        className={flagsOptions.calidad ? active : inactive}
      >
        calidad
      </button>
      <button
        onClick={() => changeFlags("filtro", flagsOptions, setFlagsOptions)}
        className={flagsOptions.filtro ? active : inactive}
      >
        filtro
      </button>
    </div>
  );
};

export default SelectionButtons;
