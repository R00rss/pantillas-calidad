//se usa en calidad
export function getPlantillasByIdTrx(idTrx, idTipoPlantilla = 1, idUser = 121) {
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
