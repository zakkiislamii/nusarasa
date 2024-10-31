/* eslint-disable @typescript-eslint/no-explicit-any */
import { findManyStores } from "@/services/api/queries/role/sellers/stores/storesQueries";
import {
  errorHandler,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
} from "@/utils/response/responseHelpers";
import { isValidApiKey } from "@/utils/validation/validation";
import { NextRequest } from "next/server";

export const getAllStores = async (req: NextRequest) => {
 if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }
  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }

  try {
    const data = await findManyStores();
    if (data) {
      return successResponse("Stores retrieved successfully", data);
    }
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};
