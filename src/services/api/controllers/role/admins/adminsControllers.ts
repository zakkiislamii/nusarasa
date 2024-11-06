import { getAllUsersByRole } from "@/services/api/queries/role/admins/adminsQueries";
import {
  costumHandler,
  errorHandler,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedTokenResponse,
} from "@/utils/response/responseHelpers";
import {
  isValidApiKey,
  validateAuthAdmins,
} from "@/utils/validation/validation";
import { NextRequest, NextResponse } from "next/server";

export const getAllUsersForAdmins = async (
  req: NextRequest,
  role: string
): Promise<Response> => {
  if (!isValidApiKey(req)) {
    return unauthorizedTokenResponse();
  }

  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }

  const { isValid, error } = await validateAuthAdmins(req);
  if (!isValid) {
    return error instanceof Response
      ? error
      : new NextResponse(null, { status: 500 });
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
  } catch (error: unknown) {
    let errorMessage: string;
    let errorObject: Error;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorObject = error;
    } else {
      errorMessage = "An unknown error occurred";
      errorObject = new Error(errorMessage);
    }

    return errorHandler(errorObject, errorMessage);
  }
};
