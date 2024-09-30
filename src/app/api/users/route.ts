import { NextRequest } from "next/server";
import { getAllUsers } from "../users/services/controllers/userController";

export const GET = async (req: NextRequest) => {
  return await getAllUsers(req);
};
