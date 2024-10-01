import React, { ButtonHTMLAttributes } from "react";
import google from "../../../assets/icon/google.png";
import Image from "next/image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonGoogle = ({
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`bg-white hover:bg-[#dad5d5] w-[80%] max-w-full py-3 border font-bold rounded-3xl ${className}`}
      disabled={disabled}
      {...props}
    >
      <div className="relative flex flex-shrink gap-2 items-center justify-center">
        <Image src={google} alt="Google icon" className="w-5 h-5" />
        <span className="">{children}</span>
      </div>
    </button>
  );
};

export default ButtonGoogle;
