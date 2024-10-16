import { toast } from "sonner";
import axios from "axios";
import { dataDiriFormData } from "../components";
import { getSession } from "@/utils/token/token";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formData: dataDiriFormData,
  setFormData: React.Dispatch<React.SetStateAction<dataDiriFormData>>
): void => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

export const onSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: dataDiriFormData,
  push: (path: string) => void
): Promise<void> => {
  e.preventDefault();
  const token = await getSession();
  try {
    const response = await axios.put("/api/users", formData, {
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
      push("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`${error.response?.data?.message}`);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};
