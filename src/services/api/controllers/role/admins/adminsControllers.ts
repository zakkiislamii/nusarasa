/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsersByRole } from "@/services/api/queries/role/admins/adminsQueries";
import { decrypt } from "@/utils/token/token";
import { NextRequest, NextResponse } from "next/server";

export const getAllUsersForAdmins = async (req: NextRequest, role: string) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      { status: 401 }
    );
  }

  if (req.method !== "GET") {
    return NextResponse.json(
      {
        code: 405,
        status: "Failed",
        message: "Method not allowed",
        error: "The method is wrong",
      },
      { status: 405 }
    );
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Missing or invalid Bearer token",
      },
      { status: 401 }
    );
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = await decrypt(token);
    if (!decodedToken || decodedToken.user.role !== "admin") {
      return NextResponse.json(
        {
          code: 403,
          status: "Failed",
          error: "Forbidden",
          message: "Access denied. Only admins can access this resource.",
        },
        { status: 403 }
      );
    }

    const data = await getAllUsersByRole(role);

    if (data && data.length > 0) {
      return NextResponse.json(
        {
          code: 200,
          status: "Success",
          message: `${
            role === "seller" ? "Sellers" : "Members"
          } retrieved successfully`,
          data,
        },
        { status: 200 }
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
  } catch (error) {
    console.error("Error in getAllUsersForAdmins:", error);
    return NextResponse.json(
      {
        code: 500,
        status: "Error",
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
