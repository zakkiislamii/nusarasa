import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      accessToken?: string;
    } & JWT["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    accessToken?: string;
  }
}
