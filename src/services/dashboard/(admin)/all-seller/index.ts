import { Seller } from "@/interfaces/dashboard/admin";
import { getSession } from "@/utils/token/token";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useGetAllSeller = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSeller = async () => {
      try {
        const token = await getSession();
        const response = await axios.get("/api/admins/seller", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setSellers(response.data.data);
        }
      } catch (err) {
        toast.error(`${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAllSeller();
  }, []);

  return { sellers, loading };
};
