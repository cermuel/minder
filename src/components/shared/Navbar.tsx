// import React from "react";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/Auth";
import { isAuthenticated } from "../../functions/Auth";

const Navbar = ({
  children,
  usewhite,
}: {
  children?: JSX.Element;
  usewhite?: boolean;
}) => {
  const { setIsAuth } = useContext(AuthContext);

  const reverseAuth = () => {
    let auth = isAuthenticated();
    auth ? setIsAuth(true) : setIsAuth(false);
  };

  useLayoutEffect(() => {
    reverseAuth();
  });
  return (
    <nav
      className={`w-full ${
        usewhite && "bg-white"
      } md:px-20 sm:px-14 px-8 h-20 fixed top-0 items-center flex justify-between`}
    >
      <>
        <Link to="/">
          <img src={logo} alt="" className="sm:w-40 w-28" />
        </Link>
        {children}
      </>
    </nav>
  );
};

export default Navbar;
