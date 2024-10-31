/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsersByRole } from "@/services/api/queries/role/admins/adminsQueries";
import {
  costumHandler,
  errorHandler,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
} from "@/utils/response/responseHelpers";

import {
  isValidApiKey,
  validateAuthAdmins,
} from "@/utils/validation/validation";
import { NextRequest } from "next/server";

export const getAllUsersForAdmins = async (req: NextRequest, role: string) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }

  const { isValid, error } = await validateAuthAdmins(req);
  if (!isValid) {
    return error;
  }

  try {
    const data = await getAllUsersByRole(role);
    if (data && data.length > 0) {
      return successResponse(
        `${role === "seller" ? "Sellers" : "Members"} retrieved successfully`,
        data
      );
    } else {
      return costumHandler(
        404,
        `No ${role === "seller" ? "sellers" : "members"} found`
      );
    }
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};
