import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const detailActions = JSON.parse(request.cookies.get('detailActions')?.value || "[]");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if(detailActions?.length === 0){
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};

export default middleware;
