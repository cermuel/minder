import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/shared/auth/Input";
import Navbar from "../../components/shared/Navbar";
import { convertToBase64, registerWithDetails } from "../../functions/Auth";
import { RegisterType } from "../../types/auth";

const Register = () => {
  const navigate = useNavigate();
  const [registerDetails, setregisterDetails] = useState<RegisterType>({
    email: "",
    password: "",
    name: "",
    profilePicture: "",
    username: "",
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [mainImage, setmainImage] = useState<string>("");

  useEffect(() => {
    setregisterDetails({
      ...registerDetails,
      profilePicture: mainImage,
    });
  }, [mainImage]);
  return (
    <main className="w-full h-screen bg-white">
      <Navbar />
      <Toaster />

      <form className="sm:absolute space-y-4 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] max-sm:pt-20 sm:translate-y-[-50%] sm:w-[500px] px-8">
        <h1 className="text-black font-bold text-3xl font-quote ">
          Create A New Account
        </h1>
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
          placeholder="Full Name"
          type="text"
          onChange={(e: any) => {
            setregisterDetails({
              ...registerDetails,
              name: e.target.value,
            });
          }}
        />
        <div>
          {previewImage && (
            <img
              src={previewImage}
              alt=""
              className="w-20 object-cover h-20 rounded-full"
            />
          )}
          <label
            htmlFor="image"
            className="text-black text-sm my-0 font-medium"
          >
            {imageName ? imageName : "Select Image"}
          </label>
          <input
            type="file"
            onChange={(e: any) => {
              setImageName(e.target.files[0].name);
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
              convertToBase64(e, setmainImage);
            }}
            id="image"
            className="my-0"
            accept="image/*"
          />
        </div>
        <Input
          placeholder="Email Address"
          type="email"
          onChange={(e: any) => {
            setregisterDetails({
              ...registerDetails,
              email: e.target.value,
            });
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
            onClick={() =>
              registerWithDetails({
                details: registerDetails,
                setisLoading,
                navigate,
              })
            }
            type="button"
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
