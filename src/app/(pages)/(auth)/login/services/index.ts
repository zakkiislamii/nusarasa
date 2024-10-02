import { toast } from "sonner";
import axios from "axios";
import { LoginFormData } from "../components";
import { saveToken } from "@/utils/token";
import { getToken, removeToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useEffect, useState } from "react";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formData: LoginFormData,
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>
): void => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

export const onSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: LoginFormData,
  push: (path: string) => void
): Promise<void> => {
  e.preventDefault();
  try {
    const response = await axios.post("/api/users/login", formData, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    const bearerToken = response.data.data?.token;
    saveToken(bearerToken);

    if (response.data?.error) {
      toast.error(`${response?.data?.message}`);
    } else {
      localStorage.setItem("loginState", "true");
      toast.success("Login Successful");
      push("/data-diri");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error.response?.data?.message}`);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};

export const useIsLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkLoginStatus = useCallback(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setIsLoggedIn(false);
    router.push("/");
  }, [router]);

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [checkLoginStatus]);

  return { isLoggedIn, setIsLoggedIn, logout, checkLoginStatus };
};

export const useScrollHandler = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      setIsScrolled(window.scrollY > 50);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return { isScrolling, isScrolled };
};

export const useLogout = () => {
  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("loginState");
    toast.success("Successfully logged out!");
    window.location.reload();
  };

  return handleLogout;
};
