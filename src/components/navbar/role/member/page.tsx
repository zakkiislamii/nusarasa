"use client";

import Image from "next/image";
import { IMAGES } from "@/components/navbar/index";

import { useState } from "react";
import CartItems from "@/components/cartItem";

export default function Member() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCart = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <li onClick={handleCart}>
        <Image
          src={IMAGES.cart.src}
          alt={IMAGES.cart.alt}
          className={IMAGES.cart.className}
        />
      </li>
      <li>
        <Image
          src={IMAGES.bell.src}
          alt={IMAGES.bell.alt}
          className={IMAGES.bell.className}
        />
      </li>

      {/* Render CartItems dengan prop isOpen */}
      {isCartOpen && <CartItems open={isCartOpen} setOpen={setIsCartOpen} />}
    </>
  );
}
