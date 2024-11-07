/* eslint-disable @typescript-eslint/no-explicit-any */
// useHistory.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { Cart, CartItem, HistoryResponse } from "@/interfaces/history";
import { getSession } from "@/utils/token/token";

export const useHistory = () => {
  const [history, setHistory] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await getSession();

        if (!token) {
          setError("Unauthorized access. Please login again.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get<HistoryResponse>(
          "/api/members/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data && response.data.data) {
          const nonEmptyCarts = response.data.data.filter(
            (cart) => cart.items && cart.items.length > 0
          );
          setHistory(nonEmptyCarts);
          setError(null);
        } else {
          setError("Invalid response format");
        }
      } catch (err: any) {
        setError(err);
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotal = (items: CartItem[]) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce(
      (total, item) =>
        total + (item.product?.price || 0) * (item.quantity || 0),
      0
    );
  };

  return {
    history,
    isLoading,
    error,
    formatDate,
    formatCurrency,
    calculateTotal,
  };
};
