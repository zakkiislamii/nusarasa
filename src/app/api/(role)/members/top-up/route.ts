import { topUp } from "@/services/server/controllers/role/members/membersControllers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return await topUp(req);
};
