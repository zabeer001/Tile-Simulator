import {  NextResponse } from "next/server";
export function middleware() {
  // const token = req.cookies.get("next-auth.session-token");
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  return NextResponse.next();
}

// export const config = {
//   matcher: "/admin-dashboard",
// };
