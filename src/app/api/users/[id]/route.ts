import { NextRequest } from "next/server";
import { deleteUser } from "../../../../services/api/controllers/users/userController";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  return await deleteUser(req, id);
};
