import { NextRequest, NextResponse } from "next/server";
import { findManyStores } from "../queries/storesQueries";

export const getAllStores = async (req: NextRequest) => {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const data = await findManyStores();
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
    } catch (error: unknown) {
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
  } else {
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
};
