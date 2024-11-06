/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
  code?: number;
  status: "success" | "error" | "failed";
  message: string;
  data?: any | null;
}
