import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Input from "../../components/shared/auth/Input";
import Navbar from "../../components/shared/Navbar";
import { RegisterType } from "../../types/auth";

const Register = () => {
  const [registerDetails, setregisterDetails] = useState<RegisterType>({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  return (
    <main className="w-full h-screen bg-white">
      <Navbar />

      <form className="sm:absolute space-y-4 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:w-[500px] px-8">
        <h1 className="text-black font-bold text-3xl font-quote ">
          Create A New Account
        </h1>
        <div className="flex w-full flex-wrap items-center justify-between max-sm:gap-2">
          <button className="flex gap-2 justify-center px-2 items-center w-full bg-pry rounded-md py-3">
            <FaFacebook /> Register with Google
          </button>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <span className="h-[1px] bg-gray-300 w-6"></span>
          <span className="font-light text-black">OR</span>
          <span className="h-[1px] bg-gray-300 w-6"></span>
        </div>
        <Input
          placeholder="Full Name"
          type="text"
          onChange={(e: any) => {
            setregisterDetails({
              ...registerDetails,
              fullName: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Username"
          type="text"
          onChange={(e: any) => {
            setregisterDetails({
              ...registerDetails,
              username: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Email Address"
          type="email"
          onChange={(e: any) => {
            setregisterDetails({ ...registerDetails, email: e.target.value });
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            setregisterDetails({
              ...registerDetails,
              password: e.target.value,
            });
          }}
        />
        <span className="w-full text-gray-700 text-xs font-medium flex items-center justify-between">
          <button className="text-pry hover:underline">
            <Link to="/auth/login">Already have an account?</Link>
          </button>
        </span>
        <div className="pt-6">
          <button
            type="submit"
            className="bg-pry py-3 px-4 w-40 flex justify-center font-medium text-sm rounded-md"
          >
            {isLoading ? (
              <VscLoading className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
