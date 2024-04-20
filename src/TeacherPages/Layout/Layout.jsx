import React from "react";
import Footer from "../core/Footer";
import Navbar from "../core/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
