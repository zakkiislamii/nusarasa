import MenuDashboard from "./content/menuDashboard/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row max-w-full w-full gap-2">
      <MenuDashboard />
      <div className="w-full max-w-full ">{children}</div>
    </div>
  );
}
