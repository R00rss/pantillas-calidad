import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const simpleAlert = (message, typeOfAlert, title) => {
  MySwal.fire({
    title: <p>{title}</p>,
    icon: typeOfAlert,
    text: message,
  });
};

export const confirmAlertCallback = (
  contentMain,
  contentOnSuccess,
  contentOnFail,
  callback,
  paramsCallback,
  callback2
) => {
  MySwal.fire({
    title: contentMain.title,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    text: contentMain.message,
    icon: contentMain.typeOfAlert,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: contentMain.button,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(...paramsCallback)
        .then((res) => {
          if (res.status === 200) {
            MySwal.fire({
              title: contentOnSuccess.title,
              text: contentOnSuccess.message,
              icon: contentOnSuccess.typeOfAlert,
              confirmButtonText: contentOnSuccess.button,
            });
          } else {
            MySwal.fire({
              title: contentOnFail.title,
              text: contentOnFail.message,
              icon: contentOnFail.typeOfAlert,
              confirmButtonText: contentOnFail.button,
            });
          }
        })
        .then(() => {
          callback2();
        })
        .catch((err) => {
          console.log(err);
          MySwal.fire({
            title: contentOnFail.title,
            text: contentOnFail.message,
            icon: contentOnFail.typeOfAlert,
            confirmButtonText: contentOnFail.button,
          });
        });
    }
  });
};
export const simpleAlertCallback = (contentMain, callback) => {
  MySwal.fire({
    title: contentMain.title,
    text: contentMain.message,
    icon: contentMain.typeOfAlert,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};
export const simpleAlertCallbackNoCancel = (contentMain, callback) => {
  MySwal.fire({
    title: contentMain.title,
    text: contentMain.message,
    icon: contentMain.typeOfAlert,
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    } else {
      callback();
    }
  });
};
export const confirmAlertSaveResults = (
  contentMain,
  contentOnSuccess,
  contentOnFail,
  callback,
  paramsCallback
) => {
  MySwal.fire({
    title: contentMain.title,
    text: contentMain.message,
    icon: contentMain.typeOfAlert,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: contentMain.buttonConfirm,
    cancelButtonText: contentMain.buttonCancel,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(...paramsCallback)
        .then((data) => {
          if (data && "changes" in data && data.changes) {
            let flagAplica = false;
            let flagNota = false;
            if ("queryUpdateAplica" in data) {
              if (data.queryUpdateAplica.success) {
                if ("queryUpdateNota" in data) {
                  if (data.queryUpdateNota.success) {
                    flagAplica = true;
                  }
                }
              }
            } else if ("queryUpdateNota" in data) {
              if (data.queryUpdateNota.success) {
                flagNota = true;
              }
            }
            if (flagAplica || flagNota) {
              MySwal.fire({
                title: contentOnSuccess.title,
                text: contentOnSuccess.message,
                icon: contentOnSuccess.typeOfAlert,
                confirmButtonText: contentOnSuccess.button,
              });
            } else {
              MySwal.fire({
                title: contentOnFail.title,
                text: contentOnFail.message,
                icon: contentOnFail.typeOfAlert,
                confirmButtonText: contentOnFail.button,
              });
            }
          } else {
            MySwal.fire({
              title: "Sin cambios",
              text: "No se detectaron cambios",
              icon: "info",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          MySwal.fire({
            title: contentOnFail.title,
            text: contentOnFail.message,
            icon: contentOnFail.typeOfAlert,
            confirmButtonText: contentOnFail.button,
          });
        });
    } else {
      MySwal.fire({
        title: "Los resultados no se guardaron",
        text: "Se cancelo el guardado de resultados con éxito",
        icon: "info",
      });
    }
  });
};
export const loadingAlert = (
  contentMain,
  contentOnSuccess,
  contentOnFail,
  callback,
  paramsCallback
) => {
  MySwal.fire({
    title: contentMain.title,
    text: contentMain.message,
    icon: contentMain.typeOfAlert,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonColor: "#d33",
    cancelButtonText: contentMain.buttonCancel,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(...paramsCallback)
        .then((data) => {
          if (
            "queryUpdateAplica" in data &&
            "queryUpdateNota" in data &&
            data.queryUpdateAplica.success &&
            data.queryUpdateNota.success
          ) {
            MySwal.fire({
              title: contentOnSuccess.title,
              text: contentOnSuccess.message,
              icon: contentOnSuccess.typeOfAlert,
              confirmButtonText: contentOnSuccess.button,
            });
          } else {
            MySwal.fire({
              title: contentOnFail.title,
              text: contentOnFail.message,
              icon: contentOnFail.typeOfAlert,
              confirmButtonText: contentOnFail.button,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          MySwal.fire({
            title: contentOnFail.title,
            text: contentOnFail.message,
            icon: contentOnFail.typeOfAlert,
            confirmButtonText: contentOnFail.button,
          });
        });
    }
    if (result.isDenied) {
      MySwal.fire({
        title: "La búsqueda fue cancelada",
        text: "Se cancelo la búsqueda con éxito",
        icon: "info",
      });
    }
  });
};
export function loadingAlertGeneral(func, params, setter, content) {
  let flag = false;
  MySwal.fire({
    title: content.main.title,
    text: content.main.message,
    icon: content.main.typeOfAlert,
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  func(...params)
    .then((res) => {
      if (res && res.data) {
        setter(res.data);
        if (res.data.length == 0) {
          MySwal.fire({
            title: content.noContent.title,
            text: content.noContent.message,
            icon: content.noContent.typeOfAlert,
          });
        } else {
          flag = true;
        }
      } else {
        MySwal.fire({
          title: content.fail.title,
          text: content.fail.message,
          icon: content.fail.typeOfAlert,
          showConfirmButton: true,
          confirmButtonColor: "#3085d6",
        });
      }
    })
    .then(() => {
      if (flag) {
        MySwal.close();
      }
    })
    .catch((err) => {
      console.log(err);
      MySwal.close();
      MySwal.fire({
        title: content.fail.title,
        text: content.fail.message,
        icon: content.fail.typeOfAlert,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      });
    });
}
export const confirmSimpleAlert = (contentMain, callback) => {
  MySwal.fire({
    title: contentMain.title,
    // showClass: {
    //   popup: "animate__animated animate__fadeInDown",
    // },
    // hideClass: {
    //   popup: "animate__animated animate__fadeOutUp",
    // },
    text: contentMain.message,
    icon: contentMain.typeOfAlert,
    confirmButtonColor: "#3085d6",
    confirmButtonText: contentMain.buttonConfirm,
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};
const doubleAlert = (message, typeOfAlert, title) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: <p>{title}</p>,
    icon: typeOfAlert,
    didOpen: () => {
      // `MySwal` is a subclass of `Swal` with all the same instance & static methods
      MySwal.showLoading();
    },
  }).then(() => {
    return MySwal.fire(<p>{message}</p>);
  });
};

export default simpleAlert;
