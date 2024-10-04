"use client";
import Image from "next/image";
import Button from "@/components/buttoms/buttom submit";
import { editProfileData, IMAGES } from "../components";
import ButtonBack from "@/components/buttoms/buttom back";
import { handleChange, onSubmit } from "../services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProfileData } from "../../profile/services";

export default function ContentEditProfile() {
  const { profileData } = useProfileData();
  const data: editProfileData = {
    first_name: profileData.first_name,
    last_name: profileData.last_name,
    address: profileData.address,
    number_phone: profileData.number_phone,
    email: profileData.email,
    username: profileData.username,
  };
  const router = useRouter();
  const [formData, setFormData] = useState(data);

  return (
    <div className="relative flex-1 p-6 flex justify-center items-center ">
      <div className=" w-[35rem] p-1 max-w-full text-[#554433] flex flex-col border border-black gap-[15px] relative text-center items-center justify-center z-10 rounded-xl bg-[#F9F5F0]">
        <div className="p-5 pt-10 font-bold text-4xl w-full max-w-full "></div>
        <form
          onSubmit={(e) => onSubmit(e, formData, router.push, profileData)}
          className="w-full max-w-full p-2"
        >
          <div className="w-full flex flex-col gap-5 p-5 ">
            {/* Email */}
            <div className="flex flex-col gap-3 sm:gap-4 text-start">
              <p className="font-bold">Email</p>
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-6 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={IMAGES.nameEmail.src}
                    alt={IMAGES.nameEmail.alt}
                    className={IMAGES.nameEmail.className}
                  />
                </div>
                <input
                  type="email"
                  placeholder={profileData.email}
                  name="email"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-[#F9F5F0] text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-3 sm:gap-4 text-start">
              <p className="font-bold">Username</p>
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-6 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={IMAGES.nameUsername.src}
                    alt={IMAGES.nameUsername.alt}
                    className={IMAGES.nameUsername.className}
                  />
                </div>
                <input
                  type="username"
                  placeholder={profileData.username}
                  name="username"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-[#F9F5F0] text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* First Name */}
            <div className="flex flex-col gap-3 sm:gap-4 text-start">
              <p className="font-bold">First Name</p>
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-6 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={IMAGES.nameIcon.src}
                    alt={IMAGES.nameIcon.alt}
                    className={IMAGES.nameIcon.className}
                  />
                </div>
                <input
                  type="first_name"
                  placeholder={profileData.first_name}
                  name="first_name"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-[#F9F5F0] text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-3 sm:gap-4 text-start">
              <p className="font-bold">Last Name</p>
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-6 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={IMAGES.nameIcon.src}
                    alt={IMAGES.nameIcon.alt}
                    className={IMAGES.nameIcon.className}
                  />
                </div>
                <input
                  type="last_name"
                  placeholder={profileData.last_name}
                  name="last_name"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-[#F9F5F0] text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-3 sm:gap-4 text-start">
              <p className="font-bold">Address</p>
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-6 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={IMAGES.nameAddress.src}
                    alt={IMAGES.nameAddress.alt}
                    className={IMAGES.nameAddress.className}
                  />
                </div>
                <input
                  type="address"
                  placeholder={profileData.address}
                  name="address"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-[#F9F5F0] text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>

            {/* phone number */}
            <div className="flex flex-col gap-3 sm:gap-4 text-start">
              <p className="font-bold">Nomor Handphone</p>
              <div className="relative flex justify-center items-center text-[#1E1E1E]">
                <div className="absolute sm:left-6 left-5 flex items-center">
                  <Image
                    quality={100}
                    src={IMAGES.nameNumber.src}
                    alt={IMAGES.nameNumber.alt}
                    className={IMAGES.nameNumber.className}
                  />
                </div>
                <input
                  type="number_phone"
                  placeholder={profileData.number_phone}
                  name="number_phone"
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-[#F9F5F0] text-[#1E1E1E] rounded-md text-left"
                />
              </div>
            </div>
            <div className="justify-center items-center">
              <Button>Edit Profile</Button>
            </div>
          </div>
        </form>
        <ButtonBack className="mb-10">Back</ButtonBack>
      </div>
    </div>
  );
}
