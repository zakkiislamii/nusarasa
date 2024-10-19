"use client";
import Button from "@/components/buttoms/buttom submit";
import Image from "next/image";
import { IMAGES } from "@/components/pages/profile";
import { useProfileData } from "@/services/dashboard/profile";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/loading";

export default function ContentOfProfile() {
  const { profileData, loading } = useProfileData();
  const router = useRouter();

  const moveToEditProfile = async () => {
    router.push("/dashboard/edit-profile");
  };

  if (loading) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <div className=" p-6 flex flex-col  justify-center items-center">
      <div className="w-full max-w-[35rem] p-1 text-[#554433] flex flex-col gap-[15px] relative text-center items-center justify-center z-10 rounded-xl">
        <div className="p-5 pt-10 font-bold text-4xl w-full max-w-full">
          Halo {profileData.username}
          <span className="text-red-500">!!</span>
        </div>

        <div className=" w-full max-w-full flex flex-wrap gap-5 p-5 border border-black">
          {/* Email */}
          <div className="flex flex-col gap-3 sm:gap-4 text-start w-full md:w-[calc(50%-10px)]">
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
              <div className="w-full h-auto sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.email}
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col text-sm gap-3 sm:gap-4 text-start w-full md:w-[calc(50%-10px)]">
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
              <div className="w-full h-auto sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.username}
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-3 sm:gap-4 text-start w-full md:w-[calc(50%-10px)]">
            <p className="font-bold">Full Name</p>
            <div className="relative flex justify-center items-center text-[#1E1E1E]">
              <div className="absolute sm:left-6 left-5 flex items-center">
                <Image
                  quality={100}
                  src={IMAGES.nameIcon.src}
                  alt={IMAGES.nameIcon.alt}
                  className={IMAGES.nameIcon.className}
                />
              </div>
              <div className="w-full h-auto sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.fullname}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3  sm:gap-4 text-start w-full md:w-[calc(50%-10px)]">
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
              <div
                className={`w-full ${
                  profileData.address ? "py-2 h-auto" : "h-10 sm:h-[40px]"
                } placeholder-custom-gray pl-12 pr-5 border justify-center items-center border-black text-[#1E1E1E] rounded-md text-left`}
              >
                {profileData.address || "-"}
              </div>
            </div>
          </div>

          {/* phone number */}
          <div className="flex flex-col gap-3 sm:gap-4 text-start w-full md:w-[calc(50%-10px)]">
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
              <div className="w-full h-auto sm:h-[40px] py-2 placeholder-custom-gray pl-12 pr-5 border border-black text-[#1E1E1E] rounded-md text-left">
                {profileData.number_phone}
              </div>
            </div>
          </div>
          <div className="justify-center items-center w-full md:mt-4 mt-0 md:w-[calc(50%-10px)]">
            <Button onClick={moveToEditProfile}>Edit Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
