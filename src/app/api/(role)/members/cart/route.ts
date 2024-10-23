import { NextRequest } from "next/server";
import {
  addCartMembers,
  getCartByToken,
} from "../services/controllers/membersControllers";

export const POST = async (req: NextRequest) => {
  return await addCartMembers(req);
};

export const GET = async (req: NextRequest) => {
  return await getCartByToken(req);
};
