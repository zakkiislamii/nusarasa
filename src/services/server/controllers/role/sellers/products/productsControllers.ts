/* eslint-disable @typescript-eslint/no-explicit-any */
import { findManyProductsByToken } from "@/services/server/queries/role/sellers/products/productsQueries";
import {
  costumHandler,
  errorHandler,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
} from "@/utils/response/responseHelpers";

import {
  isValidApiKey,
  validateAuthSellers,
} from "@/utils/validation/validation";
import { NextRequest } from "next/server";

export const getAllProductsByToken = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }

  const { isValid, error, token } = await validateAuthSellers(req);
  if (!isValid || !token) {
    return error;
  }

  try {
    const data = await findManyProductsByToken(token);
    if (data) {
      return successResponse("Products retrieved successfully", data);
    } else {
      return costumHandler(404, "No products found");
    }
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};
