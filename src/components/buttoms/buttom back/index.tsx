"use client";
import React, { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonBack = ({
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={`border-[3px] border-[#F4991A] hover:bg-[#ae8c26] mt-5 w-[80%] max-w-full py-3 text-[#F4991A] font-bold rounded-3xl ${className}`}
      disabled={disabled}
      onClick={() => router.back()}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonBack;
