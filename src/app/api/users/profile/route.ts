import { NextRequest } from "next/server";
import { getProfile } from "@/services/server/controllers/users/userController";

export const GET = async (req: NextRequest) => {
  return await getProfile(req);
};
