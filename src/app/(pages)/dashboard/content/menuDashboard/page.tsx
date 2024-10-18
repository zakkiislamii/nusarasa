"use client";
import MenuDashboardClient from "./menuByRole/page";

export default function MenuDashboard() {
  return (
    <div className="p-10 border flex flex-col h-screen border-black w-60 items-center">
      <ul className="gap-10 flex flex-col font-bold">
        <MenuDashboardClient />
      </ul>
    </div>
  );
}
