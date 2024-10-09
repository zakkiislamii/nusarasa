import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createToken } from "@/utils/token";
import { saveDataFromGoogle } from "@/app/api/users/services/queries/userQueries";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile) {
        try {
          const [firstName, ...lastNameParts] = (profile.name || "").split(" ");
          const lastName = lastNameParts.join(" ");
          const username =
            profile.email?.split("@")[0] ||
            profile.name?.replace(/\s+/g, "").toLowerCase() ||
            "";
          const token = createToken({
            id_user: profile.sub || "",
            username,
          });

          await saveDataFromGoogle({
            first_name: firstName,
            last_name: lastName || undefined,
            email: profile.email,
            username,
            token,
          });

          return true;
        } catch (error) {
          console.error("Error saving user data:", error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const [firstName, ...lastNameParts] = (profile.name || "").split(" ");
        const lastName = lastNameParts.join(" ");
        const username =
          profile.email?.split("@")[0] ||
          profile.name?.replace(/\s+/g, "").toLowerCase();
        const accessToken = createToken({
          id_user: profile.sub || "",
          username: username || "",
        });

        return {
          ...token,
          accessToken,
          username,
          firstName,
          lastName,
          email: profile.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          accessToken: token.accessToken,
        },
      };
    },
  },
};
