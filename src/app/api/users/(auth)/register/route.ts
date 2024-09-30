import { NextRequest } from "next/server";
import { register } from "../../services/controllers/userController";

export const POST = async (req: NextRequest) => {
  return await register(req);
};
