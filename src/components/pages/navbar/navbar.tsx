"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import arrow from "@/assets/icon/navbar/arrow.png";
import userIcon from "@/assets/icon/navbar/profile.png";
import { NAV_LINKS, IMAGES } from "./components/index";
import {
  useIsLogin,
  useScrollHandler,
  useLogout,
} from "@/app/(pages)/(auth)/login/services";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const handleLogout = useLogout();
  const { isScrolling, isScrolled } = useScrollHandler();
  const { isLoggedIn, checkLoginStatus } = useIsLogin();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    checkLoginStatus();
    setMenuOpen(false);
  }, [pathname, checkLoginStatus]);

  const headerClassName = `
    z-50 w-full top-0 left-0 
    ${
      isScrolled && isScrolling ? "bg-opacity-10 backdrop-blur" : "bg-[#000000]"
    }
    transition-all duration-300 sticky
  `;

  return (
    <header className={headerClassName}>
      <nav className="text-white font-bold flex flex-col lg:flex-row justify-between items-center mx-auto w-full p-6 sm:ps-10 sm:pe-10">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-auto">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/" className="flex sm:gap-3 gap-2 items-center">
              <Image
                src={IMAGES.logo.src}
                alt={IMAGES.logo.alt}
                className={IMAGES.logo.className}
              />
              <Image src={IMAGES.nusarasa.src} alt={IMAGES.nusarasa.alt} />
            </Link>

            {["menu", "close"].map((iconType) => (
              <div
                key={iconType}
                className={`lg:hidden ${
                  menuOpen === (iconType === "close") ? "block" : "hidden"
                }`}
                onClick={toggleMenu}
                aria-label={iconType === "menu" ? "Open Menu" : "Close Menu"}
              >
                <Image
                  src={IMAGES[iconType as keyof typeof IMAGES].src}
                  alt={IMAGES[iconType as keyof typeof IMAGES].alt}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`pe-1 flex flex-col lg:flex-row items-center gap-[3.5vw] text-white z-50 ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="flex text-base flex-col lg:flex-row items-center lg:gap-[4vw] sm:gap-[5vw] gap-[6vw] text-white">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`font-KronaOne hover:text-[#A4A4A4] ${
                    pathname === href ? "text-[#ee6418]" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {isLoggedIn ? (
              <li className="relative">
                <button
                  className="flex gap-2 items-center rounded-2xl py-3 px-6"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                >
                  <Image src={userIcon} alt="User Icon" className="w-8 h-8" />
                  <Image
                    src={arrow}
                    alt="User Arrow"
                    className={`transition-transform duration-300 w-8 h-8 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute text-white left-1/2 transform px-[2px] py-[2px] -translate-x-1/2 mt-2 w-48 rounded-xl z-50 bg-[#F4991A] ">
                    <div className="text-white-Normal font-KronaOne rounded-xl bg-black">
                      <ul className="p-2 text-center">
                        <li>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-white hover:bg-gray-500 mb-2"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="cursor-pointer" onClick={handleLogout}>
                          <button className="w-full px-4 py-2 max-w-full text-white hover:bg-gray-500">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li className="border border-white cursor-pointer hover:text-[#dbc7c7] lg:block text-white justify-end px-[2px] py-[2px] rounded-2xl bg-[#F4991A]">
                <Link href="/login">
                  <div className="text-white-Normal rounded-2xl py-3 px-6 bg-black-Darker">
                    <span className="font-KronaOne hover:text-[#A4A4A4]">
                      Masuk
                    </span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
