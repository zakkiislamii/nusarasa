import { Role } from "@/components/pages/dashboard";

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
