import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/lib/session";

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();

  if (user) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  } else {
    
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/admin-dashboard", 
};
