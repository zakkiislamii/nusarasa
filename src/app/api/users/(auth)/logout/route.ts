import { NextRequest } from "next/server";
import { logout } from "../../services/controllers/userController";

export const GET = async (req: NextRequest) => {
  return await logout(req);
};
