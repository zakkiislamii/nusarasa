import Image from "next/image";
import { IMAGES } from "@/components/navbar/components/index";

export default function Member() {
  return (
    <>
      <li>
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
    </>
  );
}
