import { NextRequest } from "next/server";
import { logout } from "../../services/controllers/userController";

export const POST = async (req: NextRequest) => {
  return await logout(req);
};
