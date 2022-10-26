import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ValidateJWT = ({ children }) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  function hasJWT() {
    console.log(sessionStorage.getItem("token") ? true : false);
    return sessionStorage.getItem("token") ? true : false;
  }
  const verifyUser = (token_user) => {
    fetch("api/userinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token_user,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("error");
        }
      })
      .then((data) => {
        console.log(data);
        // setUserInfo(data?.user);
      });
  };
  useEffect(() => {
    console.log("entro a jwt");

    hasJWT() ? setFlag(true) : navigate("/login");
  }, []);

  return <>{flag && children}</>;
};

export default ValidateJWT;
