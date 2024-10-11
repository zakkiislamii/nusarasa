import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getSession } from "@/utils/token/token";

export interface LoginFormData {
  username: string;
  password: string;
}

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

export const useLogin = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useIsLogin();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: LoginFormData
  ): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (response.data?.error) {
        toast.error(`${response?.data?.message}`);
      } else {
        setIsLoggedIn(true);
        toast.success("Login Successful");
        router.push("/data-diri");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};

export const useIsLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await axios.get("/api/users/checkAuth", {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      setIsLoggedIn(response.data.data.isLoggedIn);
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Error checking login status:", error);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return { isLoggedIn, setIsLoggedIn, checkLoginStatus };
};

export const useLogout = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useIsLogin();

  const logout = useCallback(async () => {
    try {
      const session = getSession();
      if (!session) throw new Error("No session available");

      await axios.post(
        "/api/users/logout",
        {},
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${session}`,
          },
        }
      );
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  }, [router, setIsLoggedIn]);

  return logout;
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
