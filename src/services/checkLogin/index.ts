import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "@/utils/token/token";

export const useCheckLoginUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getSession();

        if (!token) {
          console.log("No token found");
          setIsLoggedIn(false);
          setUserRole(null);
          return;
        }

        const response = await axios.get("/api/users/checkAuth", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoggedIn(response.data.data.isLoggedIn);

        const roleData = response.data.data.session.user.role;
        if (typeof roleData === "string") {
          setUserRole(roleData);
        } else if (typeof roleData === "object" && roleData !== null) {
          setUserRole(roleData.role);
        } else {
          setUserRole(null);
        }
      } catch {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };

    checkAuth();
  }, []);

  return { isLoggedIn, userRole };
};
