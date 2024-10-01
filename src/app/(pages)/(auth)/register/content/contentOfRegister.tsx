"use client";
import React, { useState } from "react";
import Image from "next/image";
import { handleChange, onSubmit } from "../services";
import { useRouter } from "next/navigation";
import { useTogglePassword } from "../components";
import { icons } from "../components";
import { registerFormData } from "../components";
import Link from "next/link";

const data: registerFormData = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function ContentRegister() {
  const [formData, setFormData] = useState(data);
  const router = useRouter();
  const {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useTogglePassword();
  const { iconUsername, iconEmail, iconHide, iconShow, iconPassword } = icons();

  return (
    <div className="relative flex-1 p-6 flex justify-center items-center ">
      <div className=" w-[35rem] text-[#554433] flex flex-col border border-black gap-[20px] relative text-center z-10 rounded-xl bg-[#F9F5F0]">
        <div className="p-5 pt-10 font-bold text-4xl">Buat Akun Baru</div>
        <form onSubmit={(e) => onSubmit(e, formData, router.push)}>
          <div className="w-full flex flex-col gap-5 sm:gap-3 p-5">
            <style>
              {`
                  .placeholder-custom-gray::placeholder {
                    color: #1E1E1E;
                  }
                `}
            </style>

            {/* Email */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-7 left-5  flex items-center">
                  <Image
                    quality={100}
                    src={iconEmail}
                    alt="icon email"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  required
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* username */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-7 left-5  flex items-center">
                  <Image
                    quality={100}
                    src={iconUsername}
                    alt="icon username"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="username"
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-7 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={iconPassword}
                    alt="icon confirm password"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  required
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-12 border text-[#1E1E1E] rounded-md text-left"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-6 justify-center items-center"
                >
                  <Image
                    src={showConfirmPassword ? iconHide : iconShow}
                    alt="Toggle confirm password visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>

          <button className="bg-[#F4991A] hover:bg-[#fdce40] w-[25rem] py-3 me-10 ms-10 text-white font-bold rounded-3xl ">
            Register
          </button>
        </form>
        <div className="flex items-center  max-w-full ps-10 pe-10">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Atau</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button className="bg-white py-3 me-10 ms-10 border font-bold rounded-3xl  ">
          Register dengan Google
        </button>
        <p className="text-[#554433] pb-10 font-bold">
          Sudah punya akun?{" "}
          <Link className="cursor-pointer" href="/login">
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
