"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import email from "../../../../../assets/icon/email.png";
import username from "../../../../../assets/icon/username.png";
import password from "../../../../../assets/icon/password.png";
import show from "../../../../../assets/icon/show.png";
import hide from "../../../../../assets/icon/hide.png";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ContentRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      name === "username" ||
      name === "password" ||
      name === "email" ||
      name === "confirm_password"
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (response.data?.error) {
        toast.error(`${response?.data?.message}`);
      } else {
        toast.success("Registration Successful");
        push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative flex-1 p-6 flex justify-center items-center ">
      <Toaster position="top-center" closeButton richColors expand={false} />
      <div className=" w-[35rem] text-[#554433] flex flex-col border border-black gap-[20px] relative text-center z-10 rounded-xl bg-[#F9F5F0]">
        <div className="p-5 pt-10 font-bold text-4xl">Buat Akun Baru</div>
        <form onSubmit={onSubmit}>
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
                  name="email"
                  onChange={handleChange}
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
                    src={username}
                    alt="icon username"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="username"
                  name="username"
                  required
                  onChange={handleChange}
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
                    src={password}
                    alt="icon password"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  name="password"
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-12 border text-[#1E1E1E] rounded-md text-left"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-6 justify-center items-center"
                >
                  <Image
                    src={showPassword ? hide : show}
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
                    src={password}
                    alt="icon confirm password"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  required
                  onChange={handleChange}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-12 border text-[#1E1E1E] rounded-md text-left"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-6 justify-center items-center"
                >
                  <Image
                    src={showConfirmPassword ? hide : show}
                    alt="Toggle confirm password visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>

          <button className="bg-[#F4991A] w-[25rem] py-3 me-10 ms-10 text-white font-bold rounded-3xl ">
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
          <span className="text-[#F4991A]">Login di sini.</span>
        </p>
      </div>
    </div>
  );
}
