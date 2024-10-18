"use client";

import { NAV_LINKS_DASHBOARD } from "@/components/pages/dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuDashboard() {
  const pathname = usePathname();

  return (
    <div className="p-10 border flex flex-col h-screen border-black w-60 items-center">
      <ul className="gap-10 flex flex-col font-bold">
        {NAV_LINKS_DASHBOARD.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-[#A4A4A4] w-full ${
                pathname === href ? "text-[#ee6418] font-bold" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
