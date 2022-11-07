import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ValidateJWT from "./ValidateJWT";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ValidateJWT>{children}</ValidateJWT>
      <Footer />
    </>
  );
};

export default Layout;
