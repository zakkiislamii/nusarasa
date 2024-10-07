import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";

const authRequiredPages = ["/profile", "/edit-profile", "/data-diri"];
const noAuthPages = ["/register", "/login"];

export function mainMiddleware() {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, authRequiredPages, noAuthPages);
