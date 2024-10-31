/* eslint-disable @typescript-eslint/no-explicit-any */
import { findManyProductsByToken } from "@/services/api/queries/role/sellers/products/productsQueries";
import {
  errorHandler,
  forbiddenResponse,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
  unauthorizedTokenResponse,
} from "@/utils/response/responseHelpers";
import { decrypt } from "@/utils/token/token";
import { isValidApiKey } from "@/utils/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export const getAllProductsByToken = async (req: NextRequest) => {
 if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = await decrypt(token);
    if (!decodedToken || decodedToken.user.role !== "seller") {
      return forbiddenResponse(decodedToken.user.role);
    }

    const data = await findManyProductsByToken(token);
    if (data) {
      return successResponse("Products retrieved successfully", data);
    } else {
      return NextResponse.json(
        {
          code: 404,
          status: "Failed",
          message: "No products found",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};
