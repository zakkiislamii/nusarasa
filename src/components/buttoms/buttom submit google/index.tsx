"use client";

import React, { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import google from "../../../assets/icon/google.png";

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
  const handleClick = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        toast.error(`Failed to sign in with Google: ${result.error}`);
        return;
      }

      if (result?.ok) {
        toast.success("Successfully signed in!");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      toast.error("An error occurred while trying to sign in with Google.");
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
