import Navbar from "./Navbar";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { SiAddthis } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { useContext, useLayoutEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import logosmall from "../../assets/logosmall.png";
import { LogoutUser } from "../../functions/Auth";
import { Toaster } from "react-hot-toast";

export const AuthNavbarContent = () => {
  const { user } = useContext(UserContext);
  const [showDropdown, setshowDropdown] = useState<boolean>(false);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/auth/login");
      location.reload();
    }
  }, []);
  return (
    <>
      <Toaster />
      <div className="flex gap-4 text-2xl max-sm:fixed max-sm:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] max-sm:bottom-4 z-50 max-sm:bg-white max-sm:left-[50%] max-sm:translate-x-[-50%] max-sm:rounded-md max-sm:px-4 max-sm:py-2 ">
        <Link to="/quotella/home">
          <AiFillHome className="hover:text-pry text-black" />
        </Link>

        <Link to="/quotella/addpost">
          <SiAddthis className="hover:text-pry text-black" />
        </Link>
        <Link to="/quotella/search">
          <AiOutlineSearch className="hover:text-pry text-black" />
        </Link>
      </div>
      <button
        onClick={() => setshowDropdown(!showDropdown)}
        className="bg-gray-300 cursor-pointer rounded-md px-4 py-1 gap-2 flex items-center justify-center"
      >
        <img src={logosmall} alt="" className="w-6 h-6" />
        <span className="text-sm text-gray-700 max-sm:hidden">
          @{user?.username}
        </span>
        <BiChevronDown className="text-gray-700 max-sm:hidden" />
      </button>
      {showDropdown && (
        <div className="absolute text-black font-light w-36 bg-white z-20 md:right-20 sm:right-14 rounded-md py-2 right-8 flex flex-col top-16">
          <button
            className="hover:bg-[#edeef9] py-1 text-sm text-left px-2"
            onClick={() => {
              navigate("/quotella/user/profile");
            }}
          >
            Profile
          </button>
          <button className="hover:bg-[#edeef9] py-1 text-sm text-left px-2">
            Verification Request
          </button>
          <button
            onClick={() => LogoutUser(navigate)}
            className="hover:bg-[#edeef9] py-1 text-sm text-left px-2"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};
const AuthNavbar = () => {
  return <Navbar usewhite={true} children={<AuthNavbarContent />} />;
};

export default AuthNavbar;
