import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  // Check if the user is accessing protected routes (using startsWith for dynamic routes)
  const isChannelRoute = req.nextUrl.pathname.startsWith("/channels");
  const isDmRoute = req.nextUrl.pathname.startsWith("/dm");
  const isServerRoute = req.nextUrl.pathname.startsWith("/servers");
  const isGroupRoute = req.nextUrl.pathname.startsWith("/groups");
  const isLoginRoute = req.nextUrl.pathname.startsWith("/login");
  const isRegisterRoute = req.nextUrl.pathname.startsWith("/signup");
  const isProtectedRoute = isChannelRoute || isDmRoute || isServerRoute || isGroupRoute;

  if (token && (isLoginRoute || isRegisterRoute)) {
    return NextResponse.redirect(new URL("/channels/@me", req.url));
  }
  // If no token and trying to access protected routes, redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // For all other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/channels/:path*", "/dm/:path*", "/servers/:path*", "/groups/:path*", "/login", "/signup"],
};
