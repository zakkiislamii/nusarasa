import { historyCart } from "@/services/server/controllers/role/members/membersControllers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return await historyCart(req);
};
