"use client";

import { useCheckLoginUser } from "@/services/(auth)/checkLogin";
import { validateRole } from "@/services/dashboard/menuDashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NAV_LINKS_DASHBOARD_ADMIN,
  NAV_LINKS_DASHBOARD_SELLER,
  NAV_LINKS_DASHBOARD_MEMBER,
} from "@/components/pages/dashboard";
import { Role } from "@prisma/client";

export default function MenuDashboardClient() {
  const { userRole } = useCheckLoginUser();
  const validatedRole = validateRole(userRole ?? "member");
  const pathname = usePathname();

  const getNavLinks = (role: Role) => {
    switch (role) {
      case "admin":
        return NAV_LINKS_DASHBOARD_ADMIN;
      case "seller":
        return NAV_LINKS_DASHBOARD_SELLER;
      default:
        return NAV_LINKS_DASHBOARD_MEMBER;
    }
  };

  const navLinks = getNavLinks(validatedRole);

  return (
    <ul className="gap-10 flex flex-col font-bold">
      {navLinks.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={`hover:text-[#A4A4A4] w-full ${
              pathname === href ? "text-[#ee6418]" : ""
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
