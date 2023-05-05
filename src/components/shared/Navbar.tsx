// import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = ({ children }: { children?: JSX.Element }) => {
  return (
    <nav className="w-full md:px-20 sm:px-14 px-8 h-20 items-center flex justify-between">
      <Link to="/">
        <img src={logo} alt="" className="sm:w-40 w-28" />
      </Link>
      {children}
    </nav>
  );
};

export default Navbar;
