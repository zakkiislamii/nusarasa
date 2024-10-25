import { NextRequest } from "next/server";
import { register } from "../../../../../services/api/controllers/users/userController";

export const POST = async (req: NextRequest) => {
  return await register(req);
};
