import Navbar from "./shared/Navbar";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import { UserContext } from "../contexts/UserContext";

const AuthNavbar = () => {
  const { username } = useContext(UserContext);
  return (
    <Navbar>
      <>
        <div className="flex gap-4 text-2xl">
          <Link to="/quotella/home">
            <AiFillHome className="hover:text-pry text-white" />
          </Link>
          <Link to="/quotella/explore">
            <MdExplore className="hover:text-pry text-white" />
          </Link>
          <Link to="/quotella/addpost">
            <SiAddthis className="hover:text-pry text-white" />
          </Link>
          <Link to="/quotella/search">
            <AiOutlineSearch className="hover:text-pry text-white" />
          </Link>
        </div>
        <div></div>
      </>
    </Navbar>
  );
};

export default AuthNavbar;
