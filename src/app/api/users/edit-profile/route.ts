import { NextRequest } from "next/server";
import { editProfile } from "../../../../services/api/controllers/users/userController";

export const POST = async (req: NextRequest) => {
  return await editProfile(req);
};
