//se usa en el navbar
export function saveResultados(resultados) {
  return fetch("/api/resultados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resultados: resultados,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
