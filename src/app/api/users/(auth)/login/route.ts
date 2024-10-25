import { NextRequest } from "next/server";
import { login } from "../../../../../services/api/controllers/users/userController";

export const POST = async (req: NextRequest) => {
  return await login(req);
};
