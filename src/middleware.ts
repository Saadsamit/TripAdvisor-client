import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/authService/authApi";

const AuthRoutes = ["/login", "/signup"];

type Role = keyof typeof roleBasedRoutes;

const commonRoutes = ["/news-feed"]

const roleBasedRoutes = {
  admin: [/^\/admin/, ...commonRoutes],
  user: [/^\/user/, ...commonRoutes],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/user", "/news-feed", "/admin", "/login", "/signup"],
};