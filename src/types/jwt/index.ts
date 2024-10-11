import { RoleType } from "../role";

export interface JwtPayload {
  Id: string;
  Entity: string;
  Role: RoleType;
  exp: number;
}
