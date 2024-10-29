"use client";
import CartItems from "@/components/cartItem";
import { useState } from "react";

export default function ContentCartItems() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsCartOpen(true)}>Open Cart</button>
      <CartItems open={isCartOpen} setOpen={setIsCartOpen} />
    </>
  );
}
