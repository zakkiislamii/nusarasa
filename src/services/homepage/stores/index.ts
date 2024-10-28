// F:\GitHub\nusarasa\src\services\homepage\stores\index.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from "@/interfaces/homepage";
import axios from "axios";
import { useEffect, useState } from "react";

export const fetchStores = async () => {
  try {
    const res = await axios.get<{ data: Store[] }>("/api/sellers/stores", {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    if (res.status === 200 && res.data) {
      return res.data.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error("An unknown error occurred");
  }
};

export const useGetAllStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStores = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const storesData = await fetchStores();
      setStores(storesData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  return { stores, setStores, isLoading, error, refetch: loadStores };
};
