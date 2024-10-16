import { Role } from "@prisma/client";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      fullname?: string;
      email?: string;
      role: Role;
      accessToken?: string;
    } & JWT["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    fullname?: string;
    email?: string;
    role: Role;
    accessToken?: string;
  }
}
