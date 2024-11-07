import { getAllUsersForAdmins } from "@/services/server/controllers/role/admins/adminsControllers";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { role: string } }
) => {
  const { role } = params;
  return await getAllUsersForAdmins(req, role);
};
