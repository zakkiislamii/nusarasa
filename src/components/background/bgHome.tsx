import Image from "next/image";
import backgroundHome from "@/assets/bg/home/bghome.jpeg";

const BackgroudHome = () => {
  return (
    <Image
      className="absolute z-10 w-full h-96 object-fit "
      src={backgroundHome}
      alt="Backgroud Home"
      objectFit="cover"
      quality={100}
    />
  );
};

export default BackgroudHome;
