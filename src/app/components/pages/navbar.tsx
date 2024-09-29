"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
//import Link from "next/link";
import { useRouter } from "next/navigation";

import logo from "../images/icon/navbar/logo.png";
import nusarasa from "../images/icon/navbar/nusarasa.png";

const NavBar: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      setIsScrolled(window.scrollY > 50);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toLogin = () => {
    router.push("/login");
  };

  return (
    <header
      className={`z-50 w-full top-0 left-0 ${
        isScrolled && isScrolling
          ? "bg-opacity-10 backdrop-blur"
          : "bg-[#F9F5F0]"
      } transition-all duration-300 sticky`}
    >
      <nav className="text-black flex flex-col lg:flex-row justify-between items-center mx-auto w-full p-6 sm:ps-10 sm:pe-10">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-auto">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="flex sm:gap-3 gap-2 items-center cursor-pointer">
              <Image className="w-10" src={logo} alt="logo Hology" />
              <Image
                className="h-6 hidden xl:block"
                src={nusarasa}
                alt="logo text Hology"
              />
            </div>

            <div
              id="close"
              className={`lg:hidden block ${menuOpen ? "block" : "hidden"}`}
              onClick={toggleMenu}
            >
              {/* <Image
                className="w-6 h-6 cursor-pointer"
                src={close}
                alt="close icon"
              /> */}
            </div>
          </div>
        </div>
        <style jsx>{`
          .active {
            color: #ee6418;
          }
          .rotate-180 {
            transform: rotate(180deg);
          }
        `}</style>
        <div
          className={`pe-1 flex flex-col lg:flex-row items-center gap-[3.5vw] text-white-Normal z-50 ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="flex text-base flex-col lg:flex-row items-center lg:gap-[4vw] sm:gap-[5vw] gap-[6vw] text-white-Normal">
            {/* <li>
              <Link
                href="/"
                className={`font-KronaOne hover:text-[#A4A4A4] ${
                  router.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/competition"
                className={`font-KronaOne hover:text-[#A4A4A4] ${
                  router.pathname === "/competition" ? "active" : ""
                }`}
              >
                Competition
              </Link>
            </li>
            <li>
              <Link
                href="/seminar"
                className={`font-KronaOne hover:text-[#A4A4A4] ${
                  router.pathname === "/seminar" ? "active" : ""
                }`}
              >
                Seminar
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className={`font-KronaOne hover:text-[#A4A4A4] ${
                  router.pathname === "/faq" ? "active" : ""
                }`}
              >
                FAQ
              </Link>
            </li> */}

            <li className="block lg:hidden">
              <div
                onClick={toLogin}
                className="cursor-pointer px-[2px] py-[2px] rounded-2xl border-solid bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500"
              >
                <button className="text-white-Normal font-KronaOne rounded-2xl py-3 px-6 bg-black-Darker">
                  <div className="font-KronaOne hover:text-[#A4A4A4]">
                    Masuk
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div className="hidden cursor-pointer lg:block text-white justify-end px-[2px] py-[2px] rounded-2xl bg-[#F4991A]">
          <button
            onClick={toLogin}
            className="text-white-Normal rounded-2xl py-3 px-6 bg-black-Darker"
          >
            <div className="font-KronaOne hover:text-[#A4A4A4]">Masuk</div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
