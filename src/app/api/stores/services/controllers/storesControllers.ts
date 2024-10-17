import { NextRequest, NextResponse } from "next/server";
import { findManyStores } from "../queries/storesQueries";
import { decrypt } from "@/utils/token/token";

export const getAllStores = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json(
      {
        code: 401,
        status: "Failed",
        error: "Unauthorized",
        message: "Invalid API key",
      },
      {
        status: 401,
      }
    );
  }
  if (req.method !== "GET") {
    return NextResponse.json(
      {
        code: 405,
        status: "failed",
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
    if (!decodedToken || decodedToken.user.role !== "seller") {
      return NextResponse.json(
        {
          code: 403,
          status: "Failed",
          error: "Forbidden",
          message: "Access denied. Only sellers can access this resource.",
        },
        { status: 403 }
      );
    }

    const data = await findManyStores();
    if (data) {
      return NextResponse.json(
        {
          code: 200,
          status: "Success",
          message: "Stores retrieved successfully",
          data,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        status: "Error",
        message: "Internal server error",
        error,
      },
      {
        status: 500,
      }
    );
  }
};
