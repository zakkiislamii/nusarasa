import { getAllProductsByToken } from "@/services/api/controllers/role/sellers/products/productsControllers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return await getAllProductsByToken(req);
};
