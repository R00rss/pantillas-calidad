//se usa en filtro llamadas
export function getLlamadas(selectedFilters) {
  return fetch("/api/getLlamadas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedFilters),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
