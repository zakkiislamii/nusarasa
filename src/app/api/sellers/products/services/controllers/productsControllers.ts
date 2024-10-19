import { decrypt } from "@/utils/token/token";
import { NextRequest, NextResponse } from "next/server";
import { findManyProductsByToken } from "../queries/productsQueries";

export const getAllProductsByToken = async (req: NextRequest) => {
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

    const data = await findManyProductsByToken(token);
    if (data) {
      return NextResponse.json(
        {
          code: 200,
          status: "Success",
          message: "Products retrieved successfully",
          data,
        },
        {
          status: 200,
        }
      );
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
