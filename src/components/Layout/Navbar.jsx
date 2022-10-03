import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
import userICON from "../../assets/images/genericUser.png";
const Navbar = () => {
  const [userinfo, setuserinfo] = useState({ username: "agenteTest" });
  let navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    handleClick("login");
  };

  const handleClick = (target) => {
    navigate(`/${target}`);
  };

  return (
    <div className="sticky top-0  bg-[#0a3853da] text-slate-100 font-medium w-full py-2">
      {userinfo && (
        <ul className="flex flex-row justify-between text-center w-full gap-5 text-base">
          <li className="cursor-pointer px-5 rounded-md flex justify-start items-center flex-row gap-5">
            <img className="w-[70px]" src={iconKMB2} alt="kmb icon" />
          </li>
          <li className="cursor-pointer  px-5 rounded-md  flex flex-row justify-end items-center gap-4">
            <img className="w-8" src={userICON} alt="user icon" />
            <h1>{userinfo?.username}</h1>
            <span
              onClick={() => handleLogOut()}
              className="cursor-pointer text-4xl"
            >
              &#8628;
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
