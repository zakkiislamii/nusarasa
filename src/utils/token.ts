import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import Cookies from "js-cookie";

const TOKEN_KEY = "bearerToken";
const TOKEN_EXPIRATION_TIME = 3 * 60 * 60; //3 jam

export const createToken = (user: { id_user: string; username: string }) => {
  const token = jwt.sign(
    {
      userId: user.id_user,
      username: user.username,
      iat: Date.now() / 1000,
      exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_TIME,
    },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    Cookies.set(TOKEN_KEY, token, {
      expires: TOKEN_EXPIRATION_TIME / (24 * 60 * 12),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }
};

export const getToken = (req?: NextRequest): string | null => {
  const removeExpiredToken = () => {
    removeToken();
    return null;
  };

  if (typeof window !== "undefined") {
    // Client-side
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      try {
        // Verify token expiration
        const decodedToken = jwt.decode(token) as { exp: number };
        if (decodedToken.exp < Date.now() / 1000) {
          return removeExpiredToken();
        }
        return token;
      } catch (error) {
        console.error("Failed to decode token", error);
        return removeExpiredToken();
      }
    }
    return null;
  } else if (req) {
    // Server-side
    const token = req.cookies.get(TOKEN_KEY)?.value;
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as { exp: number };
        if (decodedToken.exp < Date.now() / 1000) {
          return removeExpiredToken();
        }
        return token;
      } catch {
        return removeExpiredToken();
      }
    }
    return null;
  }
  return null;
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    Cookies.remove(TOKEN_KEY, { path: "/" });
  }
};
