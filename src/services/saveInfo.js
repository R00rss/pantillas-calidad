//se usa en el navbar
export function saveResultados(resultados) {
  return fetch("/api/resultados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: resultados.data,
      originalData: resultados.originalData,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
