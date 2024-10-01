"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleChange, onSubmit } from "../services";
import { LoginFormData } from "../components";
import Link from "next/link";
import { useTogglePassword } from "../components";
import { icons } from "../components";

const data: LoginFormData = {
  username: "",
  password: "",
};

export default function ContentOfLogin(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState(data);

  const { showPassword, togglePasswordVisibility } = useTogglePassword();
  const { iconUsername, iconHide, iconShow, iconPassword } = icons();

  return (
    <div className="relative flex-1 p-6 flex justify-center items-center ">
      <div className=" w-[35rem] text-[#554433] flex flex-col border border-black gap-[20px] relative text-center z-10 rounded-xl bg-[#F9F5F0]">
        <div className="p-5 pt-10 font-bold text-4xl">Selamat Datang!</div>
        <form onSubmit={(e) => onSubmit(e, formData, router.push)}>
          <div className="w-full flex flex-col gap-5 sm:gap-3 p-5">
            <style>
              {`
                  .placeholder-custom-gray::placeholder {
                    color: #1E1E1E;
                  }
                `}
            </style>

            {/* Username */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-7 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={iconUsername}
                    alt="icon username"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  placeholder="Username"
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-7 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={iconPassword}
                    alt="icon password"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  name="password"
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-12 border text-[#1E1E1E] rounded-md text-left"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-6 justify-center items-center"
                >
                  <Image
                    src={showPassword ? iconHide : iconShow}
                    alt="Toggle password visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>

          <button className="bg-[#F4991A] w-[25rem] py-3 me-10 ms-10 text-white font-bold rounded-3xl ">
            Login
          </button>
        </form>
        <div className="flex items-center  max-w-full ps-10 pe-10">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Atau</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button className="bg-white py-3 me-10 ms-10 border font-bold rounded-3xl  ">
          Login dengan Google
        </button>
        <p className="text-[#554433] pb-10 font-bold">
          Belum punya akun?{" "}
          <Link className="cursor-pointer" href="/register">
            {" "}
            <span className="text-[#F4991A] hover:text-[#fdce40]">
              Login di sini.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
