import { NextRequest } from "next/server";
import { logout } from "@/services/server/controllers/users/userController";

export const POST = async (req: NextRequest) => {
  return await logout(req);
};
