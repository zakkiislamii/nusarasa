/* eslint-disable @typescript-eslint/no-explicit-any */

import { Store } from "@/interfaces/homepage/stores";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetAllStores = () => {
  const [stores, setStores] = useState<Store[]>([]); // Store[] to keep the store-product relationship
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get<{ data: Store[] }>("/api/sellers/stores", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        if (res.status === 200 && res.data) {
          const storesData = res.data.data;
          setStores(storesData);
        } else {
          throw new Error(`Unexpected response status: ${res.status}`);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  return { stores, isLoading, error };
};
