import logo from "@/assets/icon/navbar/logo.png";
import nusarasa from "@/assets/icon/navbar/nusarasa.png";
import menu from "@/assets/icon/navbar/list.png";
import close from "@/assets/icon/navbar/closeButtom.png";
import profile from "@/assets/icon/navbar/profile.png";
import arrow from "@/assets/icon/navbar/arrow.png";

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/produk", label: "Produk" },
  { href: "/artikel", label: "Artikel" },
];

export const IMAGES = {
  logo: { src: logo, alt: "Logo", className: "w-10 h-10" },
  nusarasa: { src: nusarasa, alt: "Nusarasa", className: "sm:block hidden" },
  menu: { src: menu, alt: "Menu", className: "w-6 h-6" },
  close: { src: close, alt: "Close", className: "w-6 h-6" },
  userIcon: { src: profile, alt: "userIcon", className: "w-10 h-10" },
  arrow: {
    src: arrow,
    alt: "Arrow",
    className: "transition-transform duration-300 w-4 h-4",
  },
};
