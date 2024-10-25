import { NextRequest } from "next/server";
import { checkAuth } from "../../../../../services/api/controllers/users/userController";

export const GET = async (req: NextRequest) => {
  return await checkAuth(req);
};
