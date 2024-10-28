"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NAV_LINKS,
  IMAGES,
  NAV_LINKS_PRODUCTS,
} from "../../../../components/navbar/index";
import { useScrollHandler, useLogout } from "@/services/auth/login";
import { useCheckLoginUser } from "@/services/auth/checkLogin";
import Member from "@/components/navbar/role/member/page";
import Admin from "@/components/navbar/role/admin/page";
import Seller from "@/components/navbar/role/seller/page";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const handleLogout = useLogout();
  const { isScrolling, isScrolled } = useScrollHandler();
  const { isLoggedIn, userRole } = useCheckLoginUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownProductOpen, setDropdownProductOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProductDropdown = () =>
    setDropdownProductOpen(!dropdownProductOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const headerClassName = `
    z-50 w-full top-0 left-0 
    ${
      isScrolled && isScrolling ? "bg-opacity-10 backdrop-blur" : "bg-[#F9F5F0]"
    }
    transition-all duration-300 sticky
  `;

  return (
    <header className={headerClassName}>
      <nav className="font-bold flex flex-col lg:flex-row justify-between items-center mx-auto w-full p-6 sm:ps-10 sm:pe-10">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-auto">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/" className="flex sm:gap-3 gap-2 items-center">
              <Image
                src={IMAGES.logo.src}
                alt={IMAGES.logo.alt}
                className={IMAGES.logo.className}
              />
              <Image
                src={IMAGES.nusarasa.src}
                alt={IMAGES.nusarasa.alt}
                className={IMAGES.nusarasa.className}
              />
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
          className={`pe-1 flex flex-col lg:pt-0 pt-10  lg:flex-row items-center gap-[3.5vw]  z-50 ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="flex text-base  flex-col lg:flex-row  items-center lg:gap-[4vw] sm:gap-[5vw] gap-[10vw] text-[#554433]">
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

            {/* Dropdown for Products */}
            <li className="relative ">
              <button
                className="flex gap-3 items-center rounded-2xl py-3 px-6"
                onClick={toggleProductDropdown}
                aria-expanded={dropdownProductOpen}
              >
                <p>Products</p>
                <Image
                  src={IMAGES.arrow.src}
                  alt={IMAGES.arrow.alt}
                  className={`${IMAGES.arrow.className} ${
                    dropdownProductOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownProductOpen && (
                <div className="absolute bg-[#F9F5F0] border-[#F4991A] border-[3px]  shadow-lg rounded-lg w-full max-w-full z-50 justify-center items-center flex-col text-center flex py-3 px-10">
                  <ul className="flex flex-col gap-5 w-full max-w-full ">
                    {NAV_LINKS_PRODUCTS.map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`  hover:text-[#A4A4A4]   w-full  ${
                            pathname === href ? "text-[#ee6418]" : ""
                          }`}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {isLoggedIn ? (
              <ul className="flex flex-row items-center lg:gap-[2vw] sm:gap-[3vw] gap-[8vw] ">
                {userRole === "admin" && <Admin />}
                {userRole === "member" && <Member />}
                {userRole === "seller" && <Seller />}

                <li className="relative">
                  <button
                    className="flex gap-3 items-center rounded-2xl py-3 px-6"
                    onClick={toggleDropdown}
                    aria-expanded={dropdownOpen}
                  >
                    <Image
                      src={IMAGES.userIcon.src}
                      alt={IMAGES.userIcon.alt}
                      className={IMAGES.userIcon.className}
                    />
                    <Image
                      src={IMAGES.arrow.src}
                      alt={IMAGES.arrow.alt}
                      className={`${IMAGES.arrow.className} ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className=" text-[#554433] border-[#F4991A] border-[3px] right-7 shadow-lg py-3 px-20  absolute w-full max-w-full z-50 justify-center items-center flex-col text-center flex rounded-xl  bg-[#F9F5F0]">
                      <ul className="text-center  gap-5 w-full items-center  justify-center  flex flex-col">
                        <li>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 rounded-lg   hover:bg-[#d4b61e]"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="cursor-pointer" onClick={handleLogout}>
                          <button className="text-center px-4 py-2 rounded-lg w-full hover:bg-[#d4b61e]">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
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
