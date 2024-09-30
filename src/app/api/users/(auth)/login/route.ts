import { NextRequest } from "next/server";
import { login } from "../../services/controllers/userController";

export const POST = async (req: NextRequest) => {
  return await login(req);
};
