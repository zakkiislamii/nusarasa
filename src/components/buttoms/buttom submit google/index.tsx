"use client";

import React, { ButtonHTMLAttributes } from "react";
import google from "../../../assets/icon/google.png";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import { toast } from "sonner";
import { saveToken } from "@/utils/token";
import { saveDataFromGoogle } from "@/app/api/users/services/queries/userQueries";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onSuccess?: (email: string, token: string) => void;
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
        callbackUrl: `${window.location.origin}/`,
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        toast.error(`Gagal masuk dengan Google: ${result.error}`);
      } else {
        toast.success("Berhasil masuk dengan Google");
        const session = await getSession();
        if (session && session.user && session.user.email) {
          const email = session.user.email;
          const token = session.user.accessToken as string;
          const username = session.user.username;
          const first_name = session.user.firstName;
          const last_name = session.user.lastName;
          saveToken(token);
          saveDataFromGoogle({ first_name, last_name, email, username, token });
          if (onSuccess) {
            onSuccess(email, token);
          }
        } else {
          console.error("Session tidak tersedia setelah login.");
          toast.error("Tidak dapat mengambil informasi pengguna.");
        }
      }
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
