// F:\GitHub\nusarasa\src\services\homepage\cardHome\index.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormAddToCart } from "@/interfaces/cart";
import { Product } from "@/interfaces/homepage";
import { decrypt, getSession } from "@/utils/token/token";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useHandleCardHome = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const initializeUser = async () => {
      const gettoken = await getSession();
      if (!gettoken) {
        return null;
      }
      const token = await decrypt(gettoken);
      setUserId(token.user.id);
    };

    initializeUser();
  }, []);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const resetQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: 0,
    }));
  };

  const addToCart = async (cartData: FormAddToCart): Promise<boolean> => {
    const token = await getSession();
    try {
      const res = await axios.post("/api/members/cart", cartData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        resetQuantity(cartData.product_id);
        toast.success("Successfully added to cart");
        return true;
      }
      return false;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to add to cart");
      } else {
        toast.error("An unexpected error occurred");
      }
      return false;
    }
  };

  const handleAddToCart = async (product: Product): Promise<boolean> => {
    const quantity = quantities[product.id_product] || 0;

    if (!userId) {
      toast.error("User not found. Please try logging in again.");
      return false;
    }

    if (quantity <= 0) {
      toast.error("Please select a quantity greater than 0");
      return false;
    }

    const cartData: FormAddToCart = {
      user_id: userId,
      product_id: product.id_product,
      quantity: quantity,
    };

    return await addToCart(cartData);
  };

  return {
    handleQuantityChange,
    handleAddToCart,
    quantities,
    isAuthenticated: !!userId,
  };
};
