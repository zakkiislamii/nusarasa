import { NextRequest } from "next/server";
import { getProfile } from "../../../../services/api/controllers/users/userController";

export const GET = async (req: NextRequest) => {
  return await getProfile(req);
};
