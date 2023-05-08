import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logosmall.png";
import { auth } from "../../../config/firebase";

const Loading = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!auth.currentUser) {
      localStorage.removeItem("user");
    }
    if (!localStorage.getItem("user")) {
      navigate("/auth/login");
      location.reload();
    }
  }, []);
  return (
    <main className="w-screen h-screen bg-white flex flex-col justify-center items-center">
      <div>
        <img src={logo} className="animate-myspin w-20" alt="" />
        <p className="font-quote font-semibold text-pry text-xl mt-2">
          Loading
          <span className="animate-ping">...</span>
        </p>
      </div>
    </main>
  );
};

export default Loading;
