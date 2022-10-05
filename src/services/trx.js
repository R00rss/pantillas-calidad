function getInfo(
  date = {},
  coop = "",
  cedula = "",
  nombres = "",
  motivo = "",
  submotivo = ""
) {
  return fetch("/api/getInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      coop,
      cedula,
      nombres,
      motivo,
      submotivo,
    }),
  });
}
