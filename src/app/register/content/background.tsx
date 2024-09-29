import Image from "next/image";
import background from "../../components/images/bg/backgroudRegister.png";

const Backgroud = () => {
  return (
    <Image
      className="absolute z-10 w-full h-full"
      src={background}
      alt="Backgroud Register"
      layout="fill"
      objectFit="cover"
      quality={100}
    />
  );
};

export default Backgroud;
