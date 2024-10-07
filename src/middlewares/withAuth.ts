import { getToken } from "@/utils/token";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
  noAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const token = getToken(req);
    const pathName = req.nextUrl.pathname;

    if (requireAuth.some((path) => pathName.startsWith(path))) {
      if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
      } else {
        return NextResponse.next();
      }
    }

    if (noAuth.some((path) => pathName.startsWith(path))) {
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      } else {
        return NextResponse.next();
      }
    }

    return middleware(req, next);
  };
}
