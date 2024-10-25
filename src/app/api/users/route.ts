import { NextRequest } from "next/server";
import {
  getAllUsers,
  updatePersonalData,
} from "../../../services/api/controllers/users/userController";

export const GET = async (req: NextRequest) => {
  return await getAllUsers(req);
};

export const PUT = async (req: NextRequest) => {
  return await updatePersonalData(req);
};
