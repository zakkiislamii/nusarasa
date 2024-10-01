"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { icons } from "../components";
import { onSubmit, handleChange } from "../services";
import { dataDiriFormData } from "../components";
import { useState } from "react";
import Button from "@/components/buttoms/buttom submit";

const data: dataDiriFormData = {
  first_name: "",
  last_name: "",
  address: "",
  number_phone: "",
};

export default function ContentDataDiri() {
  const router = useRouter();
  const { iconName, iconAddress, iconNumberPhone } = icons();
  const [formData, setFormData] = useState(data);
  return (
    <div className=" relative flex-1 p-6 flex justify-center items-center ">
      <div className=" w-[35rem] max-w-full text-[#F9F5F0] p-5 flex flex-col border border-[#F9F5F0] gap-[50px] relative text-center justify-center items-center z-10 rounded-xl backdrop-blur-md">
        <div className="p-5 font-bold text-4xl">Isi data diri anda!</div>
        <form
          onSubmit={(e) => onSubmit(e, data, router.push)}
          className="w-full max-w-full p-2"
        >
          <div className="w-full flex flex-col gap-5 ">
            <style>
              {`
                  .placeholder-custom-gray::placeholder {
                    color: #1E1E1E;
                  }
                `}
            </style>

            {/* First Name */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-4 left-5  flex items-center">
                  <Image
                    quality={100}
                    src={iconName}
                    alt="icon first name"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="first_name"
                  placeholder="First Name"
                  name="first_name"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  required
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-[#F9F5F0] text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-4 left-5  flex items-center">
                  <Image
                    quality={100}
                    src={iconName}
                    alt="icon username"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="last_name"
                  name="last_name"
                  required
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  placeholder="Last Name"
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-4 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={iconAddress}
                    alt="icon address"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="address"
                  placeholder="Address"
                  required
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  name="address"
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-12 border text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* number phone */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-4 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={iconNumberPhone}
                    alt="icon number phone"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="number_phone"
                  required
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-12 border text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>
          </div>

          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
}
