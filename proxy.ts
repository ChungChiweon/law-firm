import { NextRequest, NextResponse } from "next/server";

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin-login")) {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_ACCESS_PASSWORD;

  // 환경변수 미설정 시 접근 허용 (로컬 개발 환경)
  if (!adminPassword) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("admin_access");

  if (!cookie?.value) {
    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const expectedHash = await hashPassword(adminPassword);

  if (cookie.value !== expectedHash) {
    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/(.*)"],
};
