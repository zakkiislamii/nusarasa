/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/interfaces/api";
import { NextResponse } from "next/server";

export const successResponse = (
  message: string,
  data?: any
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: 200,
      status: "success",
      message,
      data,
    },
    { status: 200 }
  );
};

export const forbiddenResponse = (role: string): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: 403,
      status: "failed",
      error: "Forbidden",
      message: `Access denied. Only ${role} can access this resource.`,
    },
    { status: 403 }
  );
};

export const errorHandler = (
  error: any,
  message: string
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: 500,
      status: "error",
      message: message || "Internal server error",
      error: error instanceof Error ? error.message : error,
      data: null,
    },
    { status: 500 }
  );
};

export const unauthorizedResponse = (): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: 401,
      status: "error",
      message: "Invalid API key",
      error: "Unauthorized",
    },
    { status: 401 }
  );
};

export const badRequestResponse = (
  message: string
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: 400,
      status: "error",
      message,
    },
    { status: 400 }
  );
};

export const unauthorizedTokenResponse = (): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: 401,
      status: "error",
      message: "Unauthorized",
    },
    { status: 401 }
  );
};

export const methodNotAllowedResponse = (): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: 405,
      status: "error",
      message: "Method not allowed",
    },
    { status: 405 }
  );
};

export const costumHandler = (
  code: number,
  message: string,
  error?: any
): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      code: code,
      status: "error",
      error: error,
      message: message,
    },
    { status: code }
  );
};
