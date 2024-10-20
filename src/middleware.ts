import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";

const authRequiredPages = ["/dashboard"];
const noAuthPages = ["/register", "/login"];
const membersPages = ["/dashboard/top-up"];
const adminsPages = ["/dashboard/all-member", "/dashboard/all-seller"];
const sellersPages = ["/dashboard/products"];

export function mainMiddleware() {
  return NextResponse.next();
}

export default withAuth(
  mainMiddleware,
  authRequiredPages,
  noAuthPages,
  membersPages,
  adminsPages,
  sellersPages
);
