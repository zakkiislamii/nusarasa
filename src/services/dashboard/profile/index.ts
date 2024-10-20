import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getSession } from "@/utils/token/token";

// Get profile user data
export const getProfileUser = async () => {
  const token = await getSession();
  try {
    const response = await axios.get("/api/users/profile", {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.error) {
      toast.error(`${response.data.message}`);
      return null;
    } else {
      return {
        email: response.data.data.email || "",
        username: response.data.data.username || "",
        fullname: response.data.data.fullname || "",
        address: response.data.data.address || "",
        number_phone: response.data.data.number_phone || "",
        balance: response.data.data.balance || "",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error.response?.data?.message}`);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
    return null;
  }
};

// Custom hook to fetch and manage profile data
export const useProfileData = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    fullname: "",
    address: "",
    number_phone: "",
    balance: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const data = await getProfileUser();
        if (data) {
          setProfileData(data);
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

    fetchProfileData();
  }, []);

  return { profileData, loading };
};
