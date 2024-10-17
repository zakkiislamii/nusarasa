"use client";

import { NAV_LINKS_DASHBOARD } from "@/components/pages/dashboard";
import Link from "next/link";

export default function MenuDashboard() {
  return (
    <div className="flex flex-row max-w-full w-full gap-2">
      <div className="p-10 border flex flex-col h-screen border-black w-60 items-center">
        <ul className="gap-10 flex flex-col">
          {NAV_LINKS_DASHBOARD.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-[#A4A4A4] w-full">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-red-500 w-full"></div>
    </div>
  );
}
