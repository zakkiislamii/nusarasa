"use client";
import Button from "@/components/buttoms/buttom submit";
import Image from "next/image";
import { IMAGES } from "../components";
import ButtonBack from "@/components/buttoms/buttom back";
import { useProfileData } from "../services";
import { useRouter } from "next/navigation";

export default function ContentOfProfile() {
  const { profileData } = useProfileData();
  const router = useRouter();

  const moveToEditProfile = async () => {
    router.push("/edit-profile");
  };

  return (
    <div className="relative flex-1 p-6 flex justify-center items-center ">
      <div className=" w-[35rem] p-1 max-w-full text-[#554433] flex flex-col border border-black gap-[15px] relative text-center items-center justify-center z-10 rounded-xl bg-[#F9F5F0]">
        <div className="p-5 pt-10 font-bold text-4xl w-full max-w-full ">
          Halo {profileData.username}
          <span className="text-red-500">!!</span>
        </div>

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
              <div className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.email}
              </div>
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
              <div className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.username}
              </div>
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
              <div className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {" "}
                {profileData.first_name}
              </div>
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
              <div className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.last_name}
              </div>
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
              <div className="w-full max-w-[488px]  py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.address}
              </div>
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
              <div className="w-full max-w-[488px] h-10 sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.number_phone}
              </div>
            </div>
          </div>
          <div className="justify-center items-center">
            <Button onClick={moveToEditProfile}>Edit Profile</Button>
            <ButtonBack>Back</ButtonBack>
          </div>
        </div>
      </div>
    </div>
  );
}
