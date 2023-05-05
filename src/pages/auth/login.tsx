import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Input from "../../components/shared/auth/Input";
import Navbar from "../../components/shared/Navbar";
import { LoginType } from "../../types/auth";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const handleSubmit = () => {
    setisLoading(!isLoading);
  };
  return (
    <main className="w-full h-screen bg-white">
      <Navbar />
      {/* <div className="w-[800px] absolute rounded-full border-pry h-[800px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[1px]">
        <div className="w-full h-full animate-myspin">
          <span className="absolute bg-pry text-xs px-2 rounded-sm py-1 top-[-2px] left-[50%] translate-x-[-50%]">
            Life's a bitch and then you die
          </span>
          <span className="absolute bg-pry text-xs px-2 rounded-sm py-1 rotate-[-90deg] left-[-83px] top-[50%] translate-y-[-50%]">
            Life's a bitch and then you die
          </span>
          <span className="absolute bg-pry text-xs px-2 rounded-sm py-1 rotate-[90deg] right-[-175px] top-[50%] translate-x-[-50%]">
            Life's a bitch and then you die
          </span>
          <span className="absolute bg-pry text-xs px-2 rounded-sm py-1 bottom-[-2px] left-[50%] translate-x-[-50%]">
            Life's a bitch and then you die
          </span>
        </div>
      </div> */}
      <form
        className="sm:absolute space-y-4 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:w-[500px] px-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-black font-bold text-3xl font-quote ">
          Login to Your Account
        </h1>
        <div className="flex w-full flex-wrap items-center justify-between max-sm:gap-2">
          <button className="flex gap-2 justify-center px-2 items-center w-full sm:w-[48%] bg-[#0d6efd] rounded-md py-3">
            <FaFacebook /> Login with Facebook
          </button>
          <button className="flex gap-2 justify-center px-2 items-center w-full sm:w-[48%] bg-[black] rounded-md py-3">
            <FaFacebook /> Login with Facebook
          </button>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <span className="h-[1px] bg-gray-300 w-6"></span>
          <span className="font-light text-black">OR</span>
          <span className="h-[1px] bg-gray-300 w-6"></span>
        </div>
        <Input
          placeholder="Email Address"
          type="email"
          onChange={(e: any) => {
            setLoginDetails({ ...loginDetails, email: e.target.value });
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            setLoginDetails({ ...loginDetails, password: e.target.value });
          }}
        />
        <span className="w-full text-gray-700 text-xs font-medium flex items-center justify-between">
          <button className="text-pry hover:underline">
            <Link to="/auth/register">Don't have an account?</Link>
          </button>
          <button className="hover:underline">Forgot Password </button>
        </span>
        <div className="pt-6">
          <button
            type="submit"
            className="bg-pry py-3 px-4 w-48 flex justify-center font-medium text-sm rounded-md"
          >
            {isLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              "Login to Your Account"
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
