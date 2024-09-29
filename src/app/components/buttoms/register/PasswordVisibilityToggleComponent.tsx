"use client";

import React, { useState } from "react";
import Image from "next/image";
import password from "../../images/icon/password.png";
import show from "../../images/icon/show.png";
import hide from "../../images/icon/hide.png";

interface PasswordInputProps {
  placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative flex justify-center items-center text-[#1E1E1E]">
      <div className="absolute sm:left-7 left-5 flex items-center">
        <Image
          quality={100}
          src={password}
          alt="icon password"
          className="w-5 h-5"
        />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-12 border text-[#1E1E1E] rounded-md text-left"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-6 justify-center items-center"
      >
        <Image
          src={showPassword ? hide : show}
          alt="Toggle password visibility"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

export default PasswordInput;
