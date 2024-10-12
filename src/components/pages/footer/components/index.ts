import logo from "@/assets/icon/navbar/logo.png";
import nusarasa from "@/assets/icon/navbar/nusarasa.png";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tentang-kami", label: "Foods" },
  { href: "/produk", label: "Drinks" },
  { href: "/artikel", label: "Stores" },
];

export const IMAGES = {
  logo: { src: logo, alt: "Logo", className: "w-20 h-20" },
  nusarasa: { src: nusarasa, alt: "Nusarasa", className: "sm:block hidden" },
};
