import Backgroud from "./content/background";
import ContentEditProfile from "./content/ContentOfEditProfile";

export default function EditProfile() {
  return (
    <div>
      <div className="relative min-h-screen flex flex-col">
        <Backgroud />
        <ContentEditProfile />
      </div>
    </div>
  );
}
