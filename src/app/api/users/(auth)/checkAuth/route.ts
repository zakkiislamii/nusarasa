import { NextRequest } from "next/server";
import { checkAuth } from "../../services/controllers/userController";

export const GET = async (req: NextRequest) => {
  return await checkAuth(req);
};
