import { NextRequest } from "next/server";
import {
  deleteCart,
  updateCartItem,
} from "@/services/server/controllers/role/members/membersControllers";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  return await deleteCart(req, id);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  return await updateCartItem(req, id);
};
