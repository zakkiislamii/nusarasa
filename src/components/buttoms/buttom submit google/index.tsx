"use client";

import React, { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import { toast } from "sonner";

import google from "../../../assets/icon/google.png";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onSuccess?: (email: string, token: string) => void;
}

const ButtonGoogle = ({ className = "", children, ...props }: ButtonProps) => {
  const handleClick = async () => {
    try {
      const result = await signIn("google");

      if (result?.error) {
        console.error("Sign in error:", result.error);
        toast.error(`Gagal masuk dengan Google: ${result.error}`);
        return;
      }
      const session = await getSession();
      console.log(session);
      console.log(1);
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      toast.error("Terjadi kesalahan saat mencoba masuk dengan Google");
    }
  };

  return (
    <button
      onClick={handleClick}
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
