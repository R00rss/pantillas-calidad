import React, { useEffect, useState } from "react";
import "../styles/Login/LoginPage.css";
import kmbIconWhite from "../assets/icons/kmbWhite.png";
import { useRef } from "react";
import simpleAlert, { confirmSimpleAlert } from "../utils/manageAlerts";
import { useDispatch } from "react-redux";
import { authenticUser } from "../services/login";

const Login = () => {
  const dispatch = useDispatch();
  const [checkRemember, setCheckRemember] = useState(false);
  const username = useRef(null);
  const password = useRef(null);
  const buttonLogin = useRef(null);
  useEffect(() => {
    sessionStorage.clear();
    // if (sessionStorage.getItem("username")) {
    //   username.current.value = sessionStorage.getItem("username");
    //   password.current.value = sessionStorage.getItem("password");
    //   setCheckRemember(true);
    // }
  }, []);

  function handleLogin(e) {
    console.log(e);
    e.preventDefault();
    function resetLoginButton() {
      buttonLogin.current.value = "Login";
      buttonLogin.current.disabled = false;
      buttonLogin.current.style.cssText =
        "color: #000000;background-color: rgb(103 232 249); border-color: transparent";
    }

    buttonLogin.current.disabled = true;
    buttonLogin.current.style.cssText =
      "color: rgb(103 232 249);background-color: transparent; border-color: rgb(103 232 249 )";
    buttonLogin.current.value = "Iniciando sesión...";
    if (username.current.value === "" || password.current.value === "") {
      simpleAlert("Error", "error", "Debe ingresar usuario y contraseña");
      resetLoginButton();
    } else {
      const dataUser = {
        username: username.current.value,
        password: password.current.value,
      };
      authenticUser(dataUser)
        .then((data) => {
          console.log(data);
          if (data && "auth" in data && data.auth && "token" in data) {
            const paramsAlert = {
              title: "Login",
              message: `Bienvenido ${username.current.value}`,
              typeOfAlert: "success",
              buttonConfirm: "Ok",
            };
            confirmSimpleAlert(paramsAlert, () => {
              sessionStorage.setItem("token", data.token);
              // sessionStorage.setItem("id", data.user.id);
              // sessionStorage.setItem("username", data.user.username);
              window.location.href = "/home";
            });
          } else {
            simpleAlert(
              "Usuario o contraseña incorrectos",
              "error",
              "Error de login"
            );
          }
        })
        .then(() => resetLoginButton());
    }
  }
  return (
    <section className="bg-black min-h-screen flex justify-center items-center">
      <section className="login-container-animation w-[350px] h-[450px] flex flex-col justify-center items-center bg-gradient-to-tr from-[rgb(42,46,54)] to-[rgb(97,107,125)] rounded-md">
        <div className="ball-login-border"></div>
        <img className="w-[100px] imageKMB" src={kmbIconWhite} alt="kmb icon" />
        <form
          onSubmit={(e) => handleLogin(e)}
          className="text-slate-50 w-[min(80%,450px)] py-10 flex flex-col text-base"
        >
          <div className="pb-2 mb-10 border-b-[1px] border-[#aaaaaa44]">
            <input
              ref={username}
              className="w-full bg-transparent outline-none placeholder-[#838383] autofill:bg-transparent"
              placeholder="Email or Username"
              type="text"
              required
            />
          </div>
          <div className="pb-2 mb-10 border-b-[1px] border-[#aaaaaa44]">
            <input
              ref={password}
              className="w-full bg-transparent outline-none placeholder-[#838383] autofill:bg-transparent"
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <div
            className="flex flex-row gap-1 mb-1"
            onClick={() => setCheckRemember((pre) => !pre)}
          >
            <div className="cursor-pointer flex justify-center items-center h-4 w-4 bg-transparent border-[1px] border-[#aaaaaa44] ">
              {checkRemember && (
                <label className="scale-[1.4] ml-1 mb-1 text-cyan-300">
                  &#10003;
                </label>
              )}
            </div>
            <label className="text-[#838383] cursor-pointer">Remenber me</label>
          </div>
          <div className="mb-6 text-[#838383] flex flex-row gap-1 items-center">
            <label className="text-2xl font-bold">&#8617;</label>
            <button className="border-[#67e8f99a] text-[#ffffffad] border-b-[1.6px] pb-[1px] hover:text-[#838383] text-sm">
              Forgot your password?
            </button>
          </div>
          <div className="text-[#000000] font-medium flex justify-center items-center">
            <input
              ref={buttonLogin}
              onClick={(e) => handleLogin(e)}
              className="cursor-pointer rounded-full w-[min(150px,95%)] bg-cyan-300 p-[.5rem_.5rem] shadow-2xl border-2 border-transparent hover:border-cyan-300 hover:bg-transparent hover:text-cyan-300 hover:animate-pulse"
              type="submit"
              value={"Login"}
            />
          </div>
        </form>
      </section>
    </section>
  );
};

export default Login;
