import React, { ButtonHTMLAttributes } from "react";
import google from "../../../assets/icon/google.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const handleClick = async () => {
  try {
    const result = await signIn("google");
    console.log(result);
    if (result?.error) {
      console.error("Sign in error:", result.error);
      toast.error(`Gagal masuk dengan Google: ${result.error}`);
    } else if (result?.url) {
      window.location.href = result.url;
    }
  } catch (error) {
    console.error("Unexpected error during sign in:", error);
    toast.error("Terjadi kesalahan saat mencoba masuk dengan Google");
  }
};

const ButtonGoogle = ({ className = "", children, ...props }: ButtonProps) => {
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
