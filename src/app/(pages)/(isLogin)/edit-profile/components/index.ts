import address from "@/assets/icon/address.png";
import number from "@/assets/icon/number_phone.png";
import name from "@/assets/icon/name.png";
import email from "@/assets/icon/email.png";
import username from "@/assets/icon/username.png";

export const IMAGES = {
  nameIcon: { src: name, alt: "icon name", className: "w-5 h-5" },
  nameNumber: { src: number, alt: "icon name", className: "w-5 h-5" },
  nameAddress: { src: address, alt: "icon name", className: "w-5 h-5" },
  nameEmail: { src: email, alt: "icon name", className: "w-5 h-5" },
  nameUsername: { src: username, alt: "icon name", className: "w-5 h-5" },
};

export interface editProfileData {
  first_name: string;
  last_name: string;
  address: string;
  number_phone: string;
  email: string;
  username: string;
}
