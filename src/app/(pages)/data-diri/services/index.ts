import { toast } from "sonner";
import axios from "axios";
import { dataDiriFormData } from "../components";

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
