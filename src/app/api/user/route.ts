import { NextRequest } from "next/server";
import {
  getAllUsers,
  register,
 
} from "./controllers/userController";

export const GET = async (req: NextRequest) => {
  return await getAllUsers(req);
};

export const POST = async (req: NextRequest) => {
  return await register(req);
};
