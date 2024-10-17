import username from "@/assets/icon/username.png";
import password from "@/assets/icon/password.png";
import show from "@/assets/icon/show.png";
import hide from "@/assets/icon/hide.png";
import { useState } from "react";

export interface LoginFormData {
  username: string;
  password: string;
}
export const icons = () => {
  return {
    iconUsername: username,
    iconPassword: password,
    iconHide: hide,
    iconShow: show,
  };
};

export const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    togglePasswordVisibility,
  };
};
