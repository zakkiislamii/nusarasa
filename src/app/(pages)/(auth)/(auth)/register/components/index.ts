import email from "@/assets/icon/email.png";
import username from "@/assets/icon/username.png";
import password from "@/assets/icon/password.png";
import show from "@/assets/icon/show.png";
import hide from "@/assets/icon/hide.png";
import { useState } from "react";

export const icons = () => {
  return {
    iconEmail: email,
    iconUsername: username,
    iconPassword: password,
    iconHide: hide,
    iconShow: show,
  };
};

export interface registerFormData {
  username: string;
  password: string;
  confirm_password: string;
  email: string;
}

export const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};
