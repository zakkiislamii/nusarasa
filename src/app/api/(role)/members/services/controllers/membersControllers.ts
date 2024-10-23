/* eslint-disable @typescript-eslint/no-explicit-any */
import { decrypt } from "@/utils/token/token";
import { NextRequest, NextResponse } from "next/server";
import { addToCart } from "../queries/membersQueries";

export const addCartMembers = async (req: NextRequest) => {
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

  if (req.method !== "POST") {
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
  const token = authHeader.split(" ")[1];
  const decodedToken = await decrypt(token);
  if (!decodedToken || decodedToken.user.role !== "member") {
    return NextResponse.json(
      {
        code: 403,
        status: "Failed",
        error: "Forbidden",
        message: "Access denied. Only members can access this resource.",
      },
      { status: 403 }
    );
  }

  try {
    const { user_id, product_id, quantity } = await req.json();
    if (!user_id || !product_id || !quantity) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const datacart = await addToCart({
      userId: user_id,
      productId: product_id,
      quantity,
    });

    return NextResponse.json(
      {
        code: 200,
        status: "Success",
        message: "Product successfully added to cart",
        data: datacart,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Handle specific error cases
    if (error.message.includes("out of stock")) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Out of Stock",
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    if (
      error.message.includes("Insufficient stock") ||
      error.message.includes("Cannot add") ||
      error.message.includes("available")
    ) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Insufficient Stock",
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    if (error.message === "Quantity must be greater than 0") {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Invalid Quantity",
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    if (error.message === "Product not found") {
      return NextResponse.json(
        {
          code: 404,
          status: "Failed",
          error: "Not Found",
          message: error.message,
        },
        {
          status: 404,
        }
      );
    }

    console.error("Error in addCartMembers:", error);
    return NextResponse.json(
      {
        code: 500,
        status: "Error",
        message: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
