import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { encrypt } from "@/utils/token/token";
import {
  saveDataFromGoogle,
  userWithRole,
} from "@/services/server/queries/users/userQueries";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return !!(account && profile);
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const username =
          profile.email?.split("@")[0] ||
          profile.name?.replace(/\s+/g, "").toLowerCase() ||
          "";
        token.fullname = profile.name || "";
        token.email = profile.email as string;
        token.username = username;

        // Check role
        const roleUser = await userWithRole({ email: token.email });
        token.role = (
          roleUser
            ? typeof roleUser === "string"
              ? roleUser
              : roleUser.role
            : "member"
        ) as Role;

        // Create a token
        const customToken = await encrypt({
          user: {
            id: profile.sub || "",
            username,
            email: profile.email || "",
            role: token.role,
          },
          expired: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        token.accessToken = customToken;

        console.log("Extracted Username:", username);

        await saveDataFromGoogle({
          fullname: token.fullname,
          username,
          email: token.email,
          token: customToken,
        });

        cookies().set({
          name: "session",
          value: customToken,
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username as string;
        session.user.fullname = token.fullname as string;
        session.user.email = token.email as string;
        session.user.accessToken = token.accessToken as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
};
