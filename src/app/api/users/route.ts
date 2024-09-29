import { NextRequest } from "next/server";
import {
  getAllUsers,
  register,
} from "../users/services/controllers/userController";

export const GET = async (req: NextRequest) => {
  return await getAllUsers(req);
};
//kocak
export const POST = async (req: NextRequest) => {
  return await register(req);
};
