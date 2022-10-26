//se usa en el filtro
export function getSubMotivos(motivo) {
  return fetch(`/api/subMotivos?motivo=${motivo}`).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
//se usa en el filtro
export function getInicialData() {
  return fetch("/api/inicialData").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
//se usa en calidad
export function getMeta(idTrx) {
  return fetch(`/api/meta/${idTrx}`).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
