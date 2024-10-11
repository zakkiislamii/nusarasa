import { RoleType } from "@/types/role";

export default function getRoleNameByName(role: string): RoleType {
  switch (role) {
    case "seller":
      return "seller";
    case "admin":
      return "admin";
    default:
      return "member";
  }
}
