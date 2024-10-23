import { NextRequest } from "next/server";
import { addCartMembers } from "../services/controllers/membersControllers";

export const POST = async (req: NextRequest) => {
  return await addCartMembers(req);
};
