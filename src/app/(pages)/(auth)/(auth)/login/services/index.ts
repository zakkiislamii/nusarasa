import { toast } from "sonner";
import axios from "axios";
import { LoginFormData } from "../components";
import { saveToken } from "@/utils/token";
import { getToken, removeToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useEffect, useState } from "react";

export const useLoginForm = (
  initialProfileData: LoginFormData = { username: "", password: "" }
) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: initialProfileData.username,
    password: initialProfileData.password,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleChange };
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

  const checkLoginStatus = useCallback(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [checkLoginStatus]);

  return { isLoggedIn, setIsLoggedIn, checkLoginStatus };
};

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    removeToken();
    localStorage.removeItem("loginState");
    toast.success("Successfully logged out!");
    router.push("/");

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }, [router]);

  return handleLogout;
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
