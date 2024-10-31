/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export const unauthorizedResponse = () =>
  NextResponse.json(
    {
      code: 401,
      status: "Failed",
      error: "Unauthorized",
      message: "Invalid API key",
    },
    { status: 401 }
  );
export const badRequestResponse = (message?: string) => {
  return NextResponse.json(
    {
      code: 400,
      status: "Failed",
      error: "Bad Request",
      message: message,
    },
    {
      status: 400,
    }
  );
};
export const unauthorizedTokenResponse = () =>
  NextResponse.json(
    {
      code: 401,
      status: "Failed",
      error: "Unauthorized",
      message: "Missing or invalid Bearer token",
    },
    { status: 401 }
  );

export const methodNotAllowedResponse = () =>
  NextResponse.json(
    {
      code: 405,
      status: "Failed",
      error: "Method Not Allowed",
      message: "The method is wrong",
    },
    { status: 405 }
  );

export const forbiddenResponse = (role: string) =>
  NextResponse.json(
    {
      code: 403,
      status: "Failed",
      error: "Forbidden",
      message: `Access denied. Only ${role} can access this resource.`,
    },
    { status: 403 }
  );

export const successResponse = (message: string, data?: any) =>
  NextResponse.json(
    { code: 200, status: "Success", message, data },
    { status: 200 }
  );

export const errorHandler = (error: Error, errorMessage: string) => {
  return NextResponse.json(
    {
      code: 500,
      status: "Error",
      error: error,
      message: errorMessage,
    },
    { status: 500 }
  );
};

export const costumHandler = (
  code: number,
  message: string,
  error?: string
) => {
  return NextResponse.json(
    {
      code: code,
      status: "Failed",
      message: message,
      error: error,
    },
    { status: code }
  );
};
