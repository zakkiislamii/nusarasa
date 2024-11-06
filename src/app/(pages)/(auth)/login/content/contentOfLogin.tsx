"use client";
import Image from "next/image";
import Link from "next/link";
import { icons } from "@/components/pages/login";
import ButtonGoogle from "@/components/buttoms/buttom submit google";
import Button from "@/components/buttoms/buttom submit";
import LoadingState from "@/components/loading";
import {
  useLogin,
  useLoginForm,
  useTogglePassword,
} from "@/services/auth/login";

export default function ContentOfLogin() {
  console.log("useLogin imported==> ", useLogin);
  const { onSubmit, loading } = useLogin();
  const { formData, handleChange } = useLoginForm();
  const { showPassword, togglePasswordVisibility } = useTogglePassword();
  const { iconUsername, iconHide, iconShow, iconPassword } = icons();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="relative flex-1 p-6 flex justify-center items-center ">
      <div className=" w-[35rem] p-1 max-w-full text-[#554433] flex flex-col border border-black gap-[15px] relative text-center items-center justify-center z-10 rounded-xl bg-[#F9F5F0]">
        <div className="p-5 pt-10 font-bold text-4xl">Selamat Datang!</div>
        <form
          onSubmit={(e) => onSubmit(e, formData)}
          className="w-full max-w-full p-2"
        >
          <div className="w-full flex flex-col gap-5 p-5">
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
                <div className="absolute sm:left-4 left-5 flex items-center">
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
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-4 left-5 flex items-center">
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
                    src={showPassword ? iconHide : iconShow}
                    alt="Toggle password visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
          <Button>Login</Button>
        </form>
        <div className="flex items-center max-w-full w-[90%]">
          <hr className="flex-grow border-t border-black" />
          <span className="mx-4 text-black">Atau</span>
          <hr className="flex-grow border-t border-black" />
        </div>

        <ButtonGoogle> Login dengan Google</ButtonGoogle>

        <p className="text-[#554433] pb-10 font-bold">
          Belum punya akun?{" "}
          <Link className="cursor-pointer" href="/register">
            {" "}
            <span className="text-[#F4991A] hover:text-[#fdce40]">
              Register di sini.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
