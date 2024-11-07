import { NextRequest } from "next/server";
import { checkoutCart } from "@/services/server/controllers/role/members/membersControllers";

export const POST = async (req: NextRequest) => {
  return await checkoutCart(req);
};
