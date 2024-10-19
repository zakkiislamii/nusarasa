import BackgroundHome from "./content/background/page";
import Body from "./content/body/page";
import Headers from "./content/headers/page";
export default function Homepage() {
  return (
    <div className="min-h-screen items-center flex flex-col z-50">
      <BackgroundHome />
      <Headers />
      <Body />
    </div>
  );
}
