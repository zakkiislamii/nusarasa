import Backgroud from "./content/background";
import ContentRegister from "./content/contentOfRegister";
import NavBar from "../components/pages/navbar";

const Register = () => {
  return (
    <div>
      <div className="relative min-h-screen flex flex-col">
        <NavBar />
        <Backgroud />
        <ContentRegister />
      </div>
    </div>
  );
};

export default Register;
