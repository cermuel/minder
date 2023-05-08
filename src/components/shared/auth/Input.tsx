import { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { InputType } from "../../../types/components/input";

const Input = ({ type, placeholder, onChange }: InputType) => {
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState(true);

  return (
    <div className="border-[1px] relative border-gray-300 rounded-md h-12 px-2">
      <label
        className={`${
          inputActive
            ? "absolute top-[-8px] rounded-[4px] px-2 py-[2px] text-white bg-[#a2a9f7]"
            : "hidden"
        }  tracking-tight space-w-3 text-xs`}
      >
        {placeholder}
      </label>
      <input
        type={
          type == "password" ? (togglePassword ? "password" : "text") : type
        }
        onFocus={() => {
          setInputActive(true);
        }}
        onBlur={() => {
          setInputActive(false);
        }}
        onChange={onChange}
        className="w-full text-lg tracking-wide h-full bg-transparent text-gray-600 font-quote outline-none"
        placeholder={!inputActive ? placeholder : ""}
      />
      {type == "password" && (
        <span className="absolute right-4 h-4 w-4 top-4">
          {togglePassword ? (
            <VscEye
              className="text-black cursor-pointer"
              onClick={() => setTogglePassword(!togglePassword)}
            />
          ) : (
            <VscEyeClosed
              className="text-black cursor-pointer"
              onClick={() => setTogglePassword(!togglePassword)}
            />
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
