import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { decodeJwt } from "../decode_jwt";
import getRoleNameByName from "@/utils/get_role";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    async session({ session, token }) {
      // Pastikan `token` memiliki struktur yang benar sebelum digunakan
      if (token?.data?.token) {
        session.user.accessToken = token.data.token;
        session.user.fullname = token.name as string;
        const decoded = decodeJwt(session.user.accessToken);
        session.user.decoded = decoded;
        session.user.username = decoded?.Role;
        session.user.role = getRoleNameByName(session.user.username);
      }
      return session;
    },

    async jwt({ token, user }) {
      console.log("User in JWT callback:", user);
      console.log("Token in JWT callback:", token);
      if (user) {
        token.id = user.id;
        token.data = {
          token: user.accessToken, // Simpan `accessToken` dari user di `token.data.token`
        }; // Memastikan `data` diisi dengan data user
      }

      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
};
