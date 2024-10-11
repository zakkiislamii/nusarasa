"use client";

import React, { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import google from "../../../assets/icon/google.png";
import loginWithGoogle from "./services";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onSuccess?: () => void;
}

const ButtonGoogle = ({
  className = "",
  children,
  onSuccess,
  ...props
}: ButtonProps) => {
  const { handleClick } = loginWithGoogle();

  const handleButtonClick = async () => {
    await handleClick(onSuccess);
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`bg-white hover:bg-[#dad5d5] w-[80%] max-w-full py-3 border font-bold rounded-3xl ${className}`}
      {...props}
    >
      <div className="relative flex flex-shrink gap-2 items-center justify-center">
        <Image src={google} alt="Google icon" className="w-5 h-5" />
        <span>{children}</span>
      </div>
    </button>
  );
};

export default ButtonGoogle;
