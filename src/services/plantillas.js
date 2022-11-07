//se usa en calidad
export function getPlantillasByIdTrx(idTrx, idUser = 121, idTipoPlantilla = 1) {
  return fetch(`/api/plantilla`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idTrx: idTrx,
      tipoPlantilla: idTipoPlantilla,
      idUser: idUser,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function changeStatusPlantilla(idPlantilla, newStatus) {
  return fetch(
    `/api/updateStatusPlantilla?idPlantilla=${idPlantilla}&status=${newStatus}`
  ).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
