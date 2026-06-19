import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_ACCESS_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "서버에 관리자 비밀번호가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!body.password || body.password !== adminPassword) {
    return NextResponse.json(
      { error: "비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const tokenValue = createHash("sha256").update(adminPassword).digest("hex");

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_access", tokenValue, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8, // 8시간
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
