/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import {
  addToCart,
  checkout,
  checkoutHistory,
  getCart,
  getUserByToken,
  removeFromCart,
  updateCartItemQuantity,
} from "../../../queries/role/members/membersQueries";
import {
  badRequestResponse,
  costumHandler,
  errorHandler,
  methodNotAllowedResponse,
  successResponse,
  unauthorizedResponse,
} from "@/utils/response/responseHelpers";
import {
  isValidApiKey,
  validateAuthMembers,
} from "@/utils/validation/validation";

export const addCartMembers = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "POST") {
    return methodNotAllowedResponse();
  }

  const { isValid, error, token } = await validateAuthMembers(req);
  if (!isValid || !token) {
    return error;
  }

  try {
    const { product_id, quantity } = await req.json();
    if (!product_id || !quantity) {
      return badRequestResponse("All fields are required");
    }
    const user = await getUserByToken(token);
    if (!user) {
      return costumHandler(400, "User not found");
    }
    const datacart = await addToCart({
      userId: user.id_user,
      productId: product_id,
      quantity,
    });

    return successResponse("Product successfully added to cart", datacart);
  } catch (error: any) {
    // Handle specific error cases
    if (error.message.includes("out of stock")) {
      return costumHandler(400, error.message, "Out of Stock");
    }

    if (
      error.message.includes("Insufficient stock") ||
      error.message.includes("Cannot add") ||
      error.message.includes("available")
    ) {
      return costumHandler(400, error.message, "Insufficient Stock");
    }

    if (error.message === "Quantity must be greater than 0") {
      return costumHandler(400, error.message, "Invalid Quantity");
    }

    if (error.message === "Product not found") {
      return costumHandler(404, error.message, "Not Found");
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

  const { isValid, error, token } = await validateAuthMembers(req);
  if (!isValid || !token) {
    return error;
  }

  try {
    const user = await getUserByToken(token);
    if (!user) {
      return costumHandler(400, "User not found");
    }
    const cartData = await getCart({ userId: user.id_user });

    if (!cartData) {
      return costumHandler(404, "Cart not found", "Not Found");
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

  const { isValid, error } = await validateAuthMembers(req);
  if (!isValid) {
    return error;
  }

  try {
    if (!id) {
      return badRequestResponse("Cart item ID is required");
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
        return costumHandler(404, "Cart item not found", "Not Found");
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

  const { isValid, error } = await validateAuthMembers(req);
  if (!isValid) {
    return error;
  }

  try {
    if (!id) {
      return badRequestResponse("Cart item ID is required");
    }

    const { quantity } = await req.json();
    if (!quantity) {
      return badRequestResponse("Quantity field is required");
    }

    if (quantity <= 0) {
      return badRequestResponse("Quantity must be greater than 0");
    }

    const updatedCart = await updateCartItemQuantity(id, quantity);
    return successResponse("Cart has been updated", updatedCart);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message === "Cart item not found") {
        return costumHandler(404, "Cart item not found", "Not Found");
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

  const { isValid, error, token } = await validateAuthMembers(req);
  if (!isValid || !token) {
    return error;
  }

  try {
    const { id_cart } = await req.json();
    if (!id_cart) {
      return badRequestResponse("All fields are required");
    }
    const user = await getUserByToken(token);
    if (!user) {
      return costumHandler(400, "User not found");
    }
    const result = await checkout(user.id_user, id_cart);

    return successResponse("Cart item has been checked out", result);
  } catch (error: any) {
    // Handle specific errors dari query
    if (error instanceof Error) {
      switch (error.message) {
        case "Cart not found or inactive":
          return costumHandler(404, "Cart not found or inactive", "Not Found");
        case "Insufficient balance":
          return badRequestResponse(
            "Insufficient balance to complete checkout"
          );
        default:
          if (error.message.includes("Produk dengan ID")) {
            return costumHandler(404, error.message, "Not Found");
          }
          if (error.message.includes("Stok produk")) {
            return badRequestResponse(error.message);
          }
      }
    }

    return errorHandler(error, error.message);
  }
};

export const historyCart = async (req: NextRequest) => {
  if (!isValidApiKey(req)) {
    return unauthorizedResponse();
  }

  if (req.method !== "GET") {
    return methodNotAllowedResponse();
  }

  const { isValid, error, token } = await validateAuthMembers(req);
  if (!isValid || !token) {
    return error;
  }
  try {
    const user = await getUserByToken(token);
    if (!user) {
      return costumHandler(400, "User not found");
    }
    const data = await checkoutHistory(user.id_user);
    return successResponse("Success get history members", data);
  } catch (error: any) {
    return errorHandler(error, error.message);
  }
};
