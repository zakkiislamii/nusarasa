import { toast } from "sonner";
import axios from "axios";
import { registerFormData } from "../components";
import { useState } from "react";

export const useRegisterForm = (
  initialProfileData: registerFormData = {
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  }
) => {
  const [formData, setFormData] = useState<registerFormData>({
    username: initialProfileData.username,
    password: initialProfileData.password,
    confirm_password: initialProfileData.confirm_password,
    email: initialProfileData.email,
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
  formData: registerFormData,
  push: (path: string) => void
): Promise<void> => {
  e.preventDefault();
  try {
    const response = await axios.post("/api/users/register", formData, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    if (response.data?.error) {
      toast.error(`${response?.data?.message}`);
    } else {
      toast.success("Registered Successfully");
      push("/login");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error.response?.data?.message}`);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};
