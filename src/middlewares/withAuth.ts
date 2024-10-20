import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { decrypt, getSessionFromAPI } from "@/utils/token/token";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
  noAuth: string[] = [],
  membersAuth: string[] = [],
  adminsAuth: string[] = [],
  sellersAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const token = await getSessionFromAPI(req);
    const pathName = req.nextUrl.pathname;

    const pathStartsWith = (prefixes: string[]) =>
      prefixes.some((path) => pathName.startsWith(path));

    if (pathStartsWith(requireAuth)) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    if (pathStartsWith(noAuth)) {
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (token) {
      const userRole = await getUserRoleFromToken(token);
      if (pathStartsWith(membersAuth) && userRole !== "member") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (pathStartsWith(adminsAuth) && userRole !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (pathStartsWith(sellersAuth) && userRole !== "seller") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return middleware(req, next);
  };
}

async function getUserRoleFromToken(token: string): Promise<string> {
  const decodedToken = await decrypt(token);
  const role = decodedToken.user.role;
  if (role === "admin") {
    return "admin";
  } else if (role === "seller") {
    return "seller";
  } else {
    return "member";
  }
}
