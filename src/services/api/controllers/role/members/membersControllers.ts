/* eslint-disable @typescript-eslint/no-explicit-any */
import { decrypt } from "@/utils/token/token";
import { NextRequest, NextResponse } from "next/server";
import {
  addToCart,
  checkout,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../../../queries/role/members/membersQueries";
import {
  badRequestResponse,
  errorHandler,
  forbiddenResponse,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
  unauthorizedTokenResponse,
} from "@/utils/response/responseHelpers";
import { isValidApiKey } from "@/utils/validation/validation";

export const addCartMembers = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "POST") {
    return methodNotAllowedResponse();
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }
  const token = authHeader.split(" ")[1];
  const decodedToken = await decrypt(token);
  if (!decodedToken || decodedToken.user.role !== "member") {
    return forbiddenResponse(decodedToken.user.role);
  }

  try {
    const { user_id, product_id, quantity } = await req.json();
    if (!user_id || !product_id || !quantity) {
      return badRequestResponse("All fields are required");
    }

    const datacart = await addToCart({
      userId: user_id,
      productId: product_id,
      quantity,
    });

    return successResponse("Product successfully added to cart", datacart);
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

    return errorHandler(error, error.message);
  }
};

export const getCartByToken = async (req: NextRequest) => {
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
  if (!decodedToken || decodedToken.user.role !== "member") {
    return forbiddenResponse(decodedToken.user.role);
  }

  try {
    const id_user = decodedToken.user.id as string;
    const cartData = await getCart({ userId: id_user });

    if (!cartData) {
      return NextResponse.json(
        {
          code: 404,
          status: "Failed",
          error: "Not Found",
          message: "Cart not found",
        },
        { status: 404 }
      );
    }
    return successResponse("Success to get member cart", cartData);
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};

export const deleteCart = async (req: NextRequest, id: string) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "DELETE") {
    return methodNotAllowedResponse();
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = await decrypt(token);
  if (!decodedToken || decodedToken.user.role !== "member") {
    return forbiddenResponse(decodedToken.user.role);
  }

  try {
    if (!id) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "Cart item ID is required",
        },
        { status: 400 }
      );
    }

    const deletedCart = await removeFromCart(id);
    return successResponse(
      "Cart item has been deleted successfully",
      deletedCart
    );
  } catch (error: any) {
    // Handle specific error dari queries
    if (error instanceof Error) {
      if (error.message === "Cart item not found") {
        return NextResponse.json(
          {
            code: 404,
            status: "Failed",
            error: "Not Found",
            message: "Cart item not found",
          },
          { status: 404 }
        );
      }
    }

    // Default error handler
    return errorHandler(error, error.message);
  }
};

export const updateCartItem = async (req: NextRequest, id: string) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "PUT") {
    return methodNotAllowedResponse();
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = await decrypt(token);
  if (!decodedToken || decodedToken.user.role !== "member") {
    return forbiddenResponse(decodedToken.user.role);
  }

  try {
    if (!id) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "Cart item ID is required",
        },
        { status: 400 }
      );
    }

    const { quantity } = await req.json();
    if (!quantity) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "Quantity field is required",
        },
        { status: 400 }
      );
    }

    // Validasi quantity harus lebih dari 0
    if (quantity <= 0) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "Quantity must be greater than 0",
        },
        { status: 400 }
      );
    }

    const updatedCart = await updateCartItemQuantity(id, quantity);
    return successResponse("Cart has been updated", updatedCart);
  } catch (error: any) {
    // Handle specific errors from queries
    if (error instanceof Error) {
      if (error.message === "Cart item not found") {
        return NextResponse.json(
          {
            code: 404,
            status: "Failed",
            error: "Not Found",
            message: "Cart item not found",
          },
          { status: 404 }
        );
      }

      if (error.message.includes("out of stock")) {
        return NextResponse.json(
          {
            code: 400,
            status: "Failed",
            error: "Bad Request",
            message: error.message,
          },
          { status: 400 }
        );
      }

      if (error.message.includes("Cannot add")) {
        return NextResponse.json(
          {
            code: 400,
            status: "Failed",
            error: "Bad Request",
            message: error.message,
          },
          { status: 400 }
        );
      }
    }

    // Default error handler
    return errorHandler(error, error.message);
  }
};

export const checkoutCart = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "POST") {
    return methodNotAllowedResponse();
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedTokenResponse();
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = await decrypt(token);
  if (!decodedToken || decodedToken.user.role !== "member") {
    return forbiddenResponse(decodedToken.user.role);
  }

  try {
    const { id_user, id_cart } = await req.json();
    if (!id_user || !id_cart) {
      return NextResponse.json(
        {
          code: 400,
          status: "Failed",
          error: "Bad Request",
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const result = await checkout(id_user, id_cart);

    return successResponse("Cart item has been checked out", result);
  } catch (error: any) {
    // Handle specific errors dari query
    if (error instanceof Error) {
      switch (error.message) {
        case "Cart not found or inactive":
          return NextResponse.json(
            {
              code: 404,
              status: "Failed",
              error: "Not Found",
              message: "Cart not found or inactive",
            },
            { status: 404 }
          );
        case "Insufficient balance":
          return NextResponse.json(
            {
              code: 400,
              status: "Failed",
              error: "Bad Request",
              message: "Insufficient balance to complete checkout",
            },
            { status: 400 }
          );
        default:
          if (error.message.includes("Produk dengan ID")) {
            return NextResponse.json(
              {
                code: 404,
                status: "Failed",
                error: "Not Found",
                message: error.message,
              },
              { status: 404 }
            );
          }
          if (error.message.includes("Stok produk")) {
            return NextResponse.json(
              {
                code: 400,
                status: "Failed",
                error: "Bad Request",
                message: error.message,
              },
              { status: 400 }
            );
          }
      }
    }

    // Default error response
    return errorHandler(error, error.message);
  }
};
