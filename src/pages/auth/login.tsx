import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/shared/auth/Input";
import Navbar from "../../components/shared/Navbar";
import { LoginWithDetails } from "../../functions/Auth";
import { LoginType } from "../../types/auth";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState<LoginType>({
    usernameORemail: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const handleSubmit = () => {
    setisLoading(!isLoading);
  };
  return (
    <main className="w-full h-screen bg-white">
      <Navbar />
      <Toaster />
      <form
        className="sm:absolute space-y-4 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] max-sm:pt-20 sm:w-[500px] px-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-black font-bold text-3xl font-quote ">
          Login to Your Account
        </h1>
        <Input
          placeholder="Email or Username"
          type="text"
          onChange={(e: any) => {
            setLoginDetails({
              ...loginDetails,
              usernameORemail: e.target.value,
            });
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
            onClick={() => {
              LoginWithDetails({
                details: loginDetails,
                setisLoading,
                navigate,
              });
            }}
            type="button"
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
