import { getAllStores } from "@/services/api/controllers/role/sellers/stores/storesControllers";
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
  return await getAllStores(req);
};
