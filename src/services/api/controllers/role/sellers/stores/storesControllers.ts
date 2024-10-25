import { findManyStores } from "@/services/api/queries/role/sellers/stores/storesQueries";
import { NextRequest, NextResponse } from "next/server";

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

  try {
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
