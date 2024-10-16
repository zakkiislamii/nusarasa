"use client";
import Image from "next/image";
import { IMAGES, NAV_LINKS } from "./components/index";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      <div className="justify-center border-[#F4991A] border-t flex flex-shrink items-center p-5 gap-10 font-bold w-full max-w-full bg-[#F9F5F0]">
        <div className="flex  items-center gap-20 justify-center w-full lg:w-auto ">
          <div className="flex flex-col gap-10 justify-center items-center">
            <Link href="/" className="flex sm:gap-3 gap-2 items-center">
              <Image
                src={IMAGES.logo.src}
                alt={IMAGES.logo.alt}
                className={IMAGES.logo.className}
              />
            </Link>
            <Link href="/" className="flex sm:gap-3 gap-2 items-center">
              <Image
                src={IMAGES.nusarasa.src}
                alt={IMAGES.nusarasa.alt}
                className={IMAGES.nusarasa.className}
              />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center   p-5 flex-1 px-5 md:px-10 lg:px-0 ">
            <div className="font-KronaOne text-h5 mb-6 text-[#554433] ">
              Quick Links
            </div>
            <div className="flex   flex-col font-bold space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <div key={href}>
                  <Link
                    href={href}
                    className={`font-KronaOne text-[#554433] hover:text-[#A4A4A4] ${
                      pathname === href ? "text-[#ee6418]" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full text-[#ffff]  p-3 bg-[#F4991A]">
        <div className="flex flex-col gap-5 text-center">
          <p>© 2024 Nusarasa - All Rights Reserved</p>
          <p>Developed by Muhammad Zakki Islami</p>
        </div>
      </div>
    </>
  );
}
