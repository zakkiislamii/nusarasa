import { Role } from "@prisma/client";

export const NAV_LINKS_DASHBOARD_MEMBER = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/top-up", label: "Top Up+" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/history", label: "History" },
  { href: "/dashboard/message", label: "Message" },
];
export const NAV_LINKS_DASHBOARD_SELLER = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/message", label: "Message" },
];
export const NAV_LINKS_DASHBOARD_ADMIN = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/all-member", label: "All Member" },
  { href: "/dashboard/all-seller", label: "All Seller" },
];

export function validateRole(userRole: string): Role {
  switch (userRole) {
    case "admin":
      return "admin";
    case "seller":
      return "seller";
    default:
      return "member";
  }
}

export function getNavLinks(role: Role) {
  switch (role) {
    case "admin":
      return NAV_LINKS_DASHBOARD_ADMIN;
    case "seller":
      return NAV_LINKS_DASHBOARD_SELLER;
    default:
      return NAV_LINKS_DASHBOARD_MEMBER;
  }
}
