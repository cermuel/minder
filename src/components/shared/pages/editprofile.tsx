import { useState } from "react";
import { UpdateProfile } from "../../../functions/Auth";
import Input from "../auth/Input";
import { BiLoaderAlt } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";

const EditProfile = ({ setshowEditProfile }: { setshowEditProfile: any }) => {
  const [fullName, setFullName] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  return (
    <div className="absolute shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] p-4 gap-2 flex-col bg-white top-[50%] left-[50%] flex w-80 h-40 translate-y-[-70%] translate-x-[-50%]">
      <GrFormClose
        className="text-black text-2xl absolute top-2 right-2"
        onClick={() => setshowEditProfile(false)}
      />
      <h1 className="w-full text-black text-center">Edit Profile</h1>
      <Input
        type="text"
        placeholder="Fullname"
        onChange={(e: any) => setFullName(e.target.value)}
      />
      <button
        className="ml-auto bg-pry px-4 py-1 rounded-md mt-2 text-sm"
        onClick={() => UpdateProfile(fullName, setloading)}
      >
        {loading ? <BiLoaderAlt className="animate-spin" /> : "Edit"}
      </button>
    </div>
  );
};

export default EditProfile;
