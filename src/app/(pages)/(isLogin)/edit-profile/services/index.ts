import { toast } from "sonner";
import axios from "axios";
import { editProfileData } from "../components";
import { getToken } from "@/utils/token";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formData: editProfileData,
  setFormData: React.Dispatch<React.SetStateAction<editProfileData>>
): void => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

export const onSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: editProfileData,
  push: (path: string) => void,
  profileData: editProfileData // Pass profileData here
): Promise<void> => {
  e.preventDefault();
  const token = getToken();

  // Create a merged version of formData and profileData
  const updatedData: editProfileData = {
    first_name: formData.first_name || profileData.first_name,
    last_name: formData.last_name || profileData.last_name,
    address: formData.address || profileData.address,
    number_phone: formData.number_phone || profileData.number_phone,
    email: formData.email || profileData.email,
    username: formData.username || profileData.username,
  };

  try {
    const response = await axios.put("/api/users/edit-profile", updatedData, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.error) {
      toast.error(`${response?.data?.message}`);
    } else {
      toast.success("Personal data entry successful");
      push("/profile");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error.response?.data?.message}`);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};
