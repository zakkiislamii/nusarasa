import Backgroud from "./content/Background";
import ContentOfProfile from "./content/ContentProfile";

export default function profile() {
  return (
    <div>
      <div className="relative min-h-screen flex flex-col">
        <Backgroud />
        <ContentOfProfile />
      </div>
    </div>
  );
}
