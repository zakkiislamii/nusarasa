import { NextRequest } from "next/server";
import { getAllUsersForAdmins } from "../services/controllers/adminsControllers";

export const GET = async (
  req: NextRequest,
  { params }: { params: { role: string } }
) => {
  const { role } = params;
  return await getAllUsersForAdmins(req, role);
};
