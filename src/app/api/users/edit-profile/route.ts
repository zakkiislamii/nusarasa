import { NextRequest } from "next/server";
import { editProfile } from "../../users/services/controllers/userController";

export const PUT = async (req: NextRequest) => {
  return await editProfile(req);
};
