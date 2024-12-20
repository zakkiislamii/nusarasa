/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { GetServerSidePropsContext, NextApiResponse } from "next";
import cookie from "cookie";
import { NextRequest } from "next/server";

const TOKEN_KEY = process.env.JWT_SECRET || "fallback_secret_key";
const key = new TextEncoder().encode(TOKEN_KEY);
const COOKIE_NAME = "session";

// Increased token expiration time
const TOKEN_EXPIRATION = "7d"; // 7 days

export async function encrypt(payload: any) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(key);
  return jwt;
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return null;
  return session;
}

export async function getSessionForCheck() {
  const cookieStore = cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return null;
  return decrypt(session);
}

export async function getSessionFromAPI(req: NextRequest) {
  const sessionCookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!sessionCookie) return null;
  return sessionCookie;
}

// For getServerSideProps
export async function getSessionFromServerSideProps(
  context: GetServerSidePropsContext
) {
  const sessionCookie = context.req.cookies[COOKIE_NAME];
  if (!sessionCookie) return null;
  return await decrypt(sessionCookie);
}

// Helper to set cookie in API response
export async function setSessionCookie(res: NextApiResponse, token: string) {
  const oneWeek = 7 * 24 * 60 * 60 * 1000; 
  const expires = new Date(Date.now() + oneWeek);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires,
      path: "/",
    })
  );
}

// Helper to remove cookie in API response
export async function removeSessionCookie(res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    })
  );
}

// New function to refresh the session token
export async function refreshSession(
  currentToken: string
): Promise<string | null> {
  const decoded = await decrypt(currentToken);
  if (!decoded) return null;

  // You might want to add additional checks here, e.g., if the user is still valid

  const newToken = await encrypt(decoded);
  return newToken;
}
