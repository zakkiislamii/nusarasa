import { JwtPayload } from "./jwt";
import { RoleType } from "./role";

declare module "next-auth" {
  interface Session {
    user: {
      id_user: string;
      username?: string;
      fullname?: string;
      accessToken?: string;
      decoded?: JwtPayload;
      role?: RoleType;
    };
  }

  interface DefaultUser {
    username: string;
    fullname: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    code: number;
    id: string;
    status: string;
    message: string;
    data: {
      token: string;
    };
  }
}
