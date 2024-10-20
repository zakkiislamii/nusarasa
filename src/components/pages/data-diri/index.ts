import address from "@/assets/icon/address.png";
import number from "@/assets/icon/number_phone.png";
import name from "@/assets/icon/name.png";

export const icons = () => {
  return {
    iconName: name,
    iconNumberPhone: number,
    iconAddress: address,
  };
};

export interface dataDiriFormData {
  fullname: string;
  address: string;
  number_phone: string;
}
