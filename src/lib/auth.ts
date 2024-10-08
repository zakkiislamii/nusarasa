import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import { PrismaClient } from "@prisma/client";
import { DefaultSession } from "next-auth";

//const prisma = new PrismaClient();

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};
