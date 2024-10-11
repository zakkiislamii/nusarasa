import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { encrypt } from "@/utils/token/token";
import { saveToken } from "@/app/api/users/services/queries/userQueries";
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
        token.email = profile.email;
        token.username = username;
        // Add the custom token to the JWT token
        const customToken = await encrypt({
          user: {
            id: profile.sub,
            username: username,
            email: profile.email,
          },
          expired: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        token.accessToken = customToken;

        // Save the token
        await saveToken({
          token: customToken,
          username: token.username as string,
        });
        cookies().set({
          name: "session",
          value: customToken,
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Use `expired` from the correct scope
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }

      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username as string;
      session.user.fullname = token.fullname as string;
      session.user.email = token.email as string;
      session.user.accessToken = token.accessToken as string;
      console.log("ini kontol==> ", session.user.accessToken);
      return session;
    },
  },
};
