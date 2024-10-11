import { JwtPayload } from "@/types/jwt";
import { jwtDecode } from "jwt-decode";

export function decodeJwt(token: string): JwtPayload {
  const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
  return decoded;
}
