import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { encrypt } from "@/utils/token/token";
import {
  existingUser,
  saveDataFromGoogle,
  userWithRole,
} from "@/app/api/users/services/queries/userQueries";
import { cookies } from "next/headers";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile) {
        return true;
      }
      return false;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const username =
          profile.email?.split("@")[0] ||
          profile.name?.replace(/\s+/g, "").toLowerCase();
        token.fullname = profile.name;
        token.email = profile.email as string;
        token.username = username as string;
        // cek role
        const roleUser = await userWithRole({ email: token.email });
        if (!roleUser) {
          token.role = "member";
        } else {
          token.role = roleUser.role;
        }

        // make a token
        const customToken = await encrypt({
          user: {
            id: profile.sub,
            username: username,
            email: profile.email,
            role: roleUser,
          },
          expired: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        token.accessToken = customToken;
        const user = await existingUser({
          email: token.email,
          username: token.username,
        });
        console.log("Extracted Username:", token.username);
        if (user) {
          await saveDataFromGoogle({
            fullname: token.fullname,
            username: token.username,
            email: token.email,
            token: customToken,
          });
        } else {
          await saveDataFromGoogle({
            fullname: token.fullname,
            username: token.username,
            email: token.email,
            token: customToken,
          });
        }
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
        session.user.role = token.role;
      }
      return session;
    },
  },
};
