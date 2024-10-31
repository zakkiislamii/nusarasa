import { NextRequest } from "next/server";

export const isValidApiKey = (req: NextRequest): boolean => {
  return req.headers.get("x-api-key") === process.env.NEXT_PUBLIC_API_KEY;
};

