import { NextRequest } from "next/server";
import { getAllProductsByToken } from "./services/controllers/productsControllers";

export const GET = async (req: NextRequest) => {
  return await getAllProductsByToken(req);
};
