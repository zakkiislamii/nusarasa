import Image from "next/image";
import background from "@/assets/bg/backgroud.png";

const Background = () => {
  return (
    <Image
      className="absolute z-10 w-full h-full"
      src={background}
      alt="Background Register"
      layout="fill"
      objectFit="cover"
      quality={100}
    />
  );
};

export default Background;
