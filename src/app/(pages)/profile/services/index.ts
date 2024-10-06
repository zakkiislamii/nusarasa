import axios from "axios";
import { getToken } from "@/utils/token";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const getProfileUser = async () => {
  const token = getToken();
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
        first_name: response.data.data.first_name || "",
        last_name: response.data.data.last_name || "",
        address: response.data.data.address || "",
        number_phone: response.data.data.number_phone || "",
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

export const useProfileData = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    address: "",
    number_phone: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
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
        return null;
      }
    };
    fetchProfileData();
  }, []);

  return { profileData };
};
