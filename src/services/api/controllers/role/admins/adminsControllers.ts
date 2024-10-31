/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsersByRole } from "@/services/api/queries/role/admins/adminsQueries";
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

export const getAllUsersForAdmins = async (req: NextRequest, role: string) => {
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
  const token = authHeader.split(" ")[1];
  const decodedToken = await decrypt(token);
  if (!decodedToken || decodedToken.user.role !== "admin") {
    return forbiddenResponse(decodedToken.user.role);
  }

  try {
    const data = await getAllUsersByRole(role);
    if (data && data.length > 0) {
      return successResponse(
        `${role === "seller" ? "Sellers" : "Members"} retrieved successfully`,
        data
      );
    } else {
      return NextResponse.json(
        {
          code: 404,
          status: "Failed",
          message: `No ${role === "seller" ? "sellers" : "members"} found`,
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};
