import { NextRequest } from "next/server";
import {
  forbiddenResponse,
  unauthorizedTokenResponse,
} from "../response/responseHelpers";
import { decrypt } from "../token/token";

export const isValidApiKey = (req: NextRequest): boolean => {
  return req.headers.get("x-api-key") === process.env.NEXT_PUBLIC_API_KEY;
};

export const validateAuthMembers = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        isValid: false,
        error: unauthorizedTokenResponse(),
        decodedToken: null,
        token: null,
      };
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await decrypt(token);

    if (!decodedToken || decodedToken.user.role !== "member") {
      return {
        isValid: false,
        error: forbiddenResponse("member"),
        decodedToken: null,
        token: null,
      };
    }

    return {
      isValid: true,
      error: null,
      decodedToken,
      token,
    };
  } catch {
    return {
      isValid: false,
      error: unauthorizedTokenResponse(),
      decodedToken: null,
    };
  }
};

export const validateAuthAdmins = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        isValid: false,
        error: unauthorizedTokenResponse(),
        decodedToken: null,
        token: null,
      };
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await decrypt(token);

    if (!decodedToken || decodedToken.user.role !== "admin") {
      return {
        isValid: false,
        error: forbiddenResponse("admin"),
        decodedToken: null,
        token: null,
      };
    }

    return {
      isValid: true,
      error: null,
      decodedToken,
      token,
    };
  } catch {
    return {
      isValid: false,
      error: unauthorizedTokenResponse(),
      decodedToken: null,
      token: null,
    };
  }
};

export const validateAuthSellers = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        isValid: false,
        error: unauthorizedTokenResponse(),
        decodedToken: null,
        token: null,
      };
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await decrypt(token);

    if (!decodedToken || decodedToken.user.role !== "seller") {
      return {
        isValid: false,
        error: forbiddenResponse("seller"),
        decodedToken: null,
        token: null,
      };
    }

    return {
      isValid: true,
      error: null,
      decodedToken,
      token,
    };
  } catch {
    return {
      isValid: false,
      error: unauthorizedTokenResponse(),
      decodedToken: null,
      token: null,
    };
  }
};
