/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getSession } from "@/utils/token/token";
import {
  CartItem,
  CheckoutRequest,
  EditingState,
  QuantityState,
} from "@/interfaces/cart";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCartItemsUser = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isEditing, setIsEditing] = useState<EditingState>({});
  const [quantities, setQuantities] = useState<QuantityState>({});

  const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    return formatted.replace(/\s+/g, "");
  };

  const handleEditClick = (item: any) => {
    setIsEditing({ ...isEditing, [item.id_cartItem]: true });
    setQuantities({
      ...quantities,
      [item.id_cartItem]: item.quantity,
    });
  };

  const handleQuantityChange = (id_cartItem: string, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setQuantities({ ...quantities, [id_cartItem]: parseInt(value, 10) || 0 });
  };

  const handleSubmitClick = async (id_cartItem: string) => {
    const quantity = quantities[id_cartItem];

    if (!quantity || isNaN(quantity)) {
      toast.error("Please enter a valid quantity");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    await handleUpdateItem(id_cartItem, quantity);
    setIsEditing({ ...isEditing, [id_cartItem]: false });
  };

  const handleCancelEdit = (id_cartItem: string, currentQuantity: number) => {
    setIsEditing({ ...isEditing, [id_cartItem]: false });
    setQuantities({ ...quantities, [id_cartItem]: currentQuantity });
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    id_cartItem: string,
    currentQuantity: number
  ) => {
    if (e.key === "Enter") {
      handleSubmitClick(id_cartItem);
    } else if (e.key === "Escape") {
      handleCancelEdit(id_cartItem, currentQuantity);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  };

  const handleCheckOut = async () => {
    const token = await getSession();
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const checkoutData: CheckoutRequest = {
      id_cart: cartItems[0].id_cart,
    };
    try {
      const res = await axios.post("/api/members/cart", checkoutData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.info("Check Out successfully");
        fetchCartItems();
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };
  const fetchCartItems = async () => {
    const token = await getSession();
    try {
      const res = await axios.get("/api/members/cart-items", {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        data: { data },
      } = res;

      if (!data) {
        throw new Error("No cart data received");
      }

      // Pastikan items ada sebelum mengaksesnya
      if (!data.items || !Array.isArray(data.items)) {
        setCartItems([]); // Set empty array jika tidak ada items
        return;
      }

      setCartItems(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]); // Set empty array pada error
      // Tambahkan error handling sesuai kebutuhan (toast, alert, dll)
    }
  };

  const handleRemoveItem = async (id_cartItem: string) => {
    try {
      const token = await getSession();
      const res = await axios.delete(`/api/members/cart-items/${id_cartItem}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Successfully deleted cart item");
        fetchCartItems();
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const handleUpdateItem = async (id_cartItem: string, quantity: number) => {
    try {
      const token = await getSession();
      const res = await axios.put(
        `/api/members/cart-items/${id_cartItem}`,
        { quantity },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Successfully update cart item");
        fetchCartItems();
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    isEditing,
    quantities,
    formatPrice,
    handleEditClick,
    handleQuantityChange,
    handleSubmitClick,
    handleCancelEdit,
    handleKeyPress,
    calculateSubtotal,
    handleRemoveItem,
    handleUpdateItem,
    handleCheckOut,
  };
};
