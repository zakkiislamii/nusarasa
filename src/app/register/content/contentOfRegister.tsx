import React from "react";
import Image from "next/image";
import email from "../../components/images/icon/email.png";
import username from "../../components/images/icon/username.png";
import PasswordInput from "../../components/buttoms/register/PasswordVisibilityToggleComponent";
import RegisterButtons from "../../components/buttoms/register/RegisterButtonsComponent";

const ContentRegister = () => {
  return (
    <div className="relative flex-1 p-5 mt-5 flex justify-center items-center ">
      <div className=" w-[35rem] text-[#554433] flex flex-col border border-black gap-[20px] relative text-center z-10 rounded-xl bg-[#F9F5F0]">
        <div className="p-5 pt-10 font-bold text-4xl">Buat Akun Baru</div>
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
                  src={email}
                  alt="icon email"
                  className="w-5 h-5"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border text-[#1E1E1E] rounded-md text-left"
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative flex justify-center items-center text-[#1E1E1E]">
              <div className="absolute sm:left-7 left-5  flex items-center">
                <Image
                  quality={100}
                  src={username}
                  alt="icon username"
                  className="w-5 h-5"
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border text-[#1E1E1E] rounded-md text-left"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <PasswordInput placeholder="Password" />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <PasswordInput placeholder="Confirm Password" />
          </div>
        </div>

        <RegisterButtons />

        <p className="text-[#554433] pb-10 font-bold">
          Sudah punya akun?{" "}
          <span className="text-[#F4991A]">Login di sini.</span>
        </p>
      </div>
    </div>
  );
};

export default ContentRegister;
