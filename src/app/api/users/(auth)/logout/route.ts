import { NextRequest } from "next/server";
import { logout } from "../../../../../services/api/controllers/users/userController";

export const POST = async (req: NextRequest) => {
  return await logout(req);
};
