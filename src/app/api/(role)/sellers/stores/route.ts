import { NextRequest } from "next/server";
import { getAllStores } from "./services/controllers/storesControllers";

export const GET = async (req: NextRequest) => {
  return await getAllStores(req);
};
