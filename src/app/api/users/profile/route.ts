import { NextRequest } from "next/server";
import { getProfile } from "../../users/services/controllers/userController";

export const GET = async (req: NextRequest) => {
  return await getProfile(req);
};
