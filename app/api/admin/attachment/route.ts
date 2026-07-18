import { NextRequest, NextResponse } from "next/server";
import { CONSULTATION_BUCKET, getStorageClient, SIGNED_URL_TTL } from "@/lib/storage";

// ── POST /api/admin/attachment ────────────────────────
// Body: { path }  →  비공개 버킷의 첨부에 대한 임시 서명 URL 발급
// (관리자 상세 패널에서 첨부를 열람할 때 호출)
// ※ 이 라우트는 기존 /api/admin/* 와 동일하게 접근 제어가 약합니다.
//   운영 전 관리자 API 전반에 인증 미들웨어를 추가하는 것을 권장합니다.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "요청을 파싱할 수 없습니다." },
      { status: 400 }
    );
  }

  const path = (body as Record<string, unknown>)?.path;
  if (!path || typeof path !== "string") {
    return NextResponse.json(
      { success: false, message: "path가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const supabase = getStorageClient();
    const { data, error } = await supabase.storage
      .from(CONSULTATION_BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL);

    if (error || !data?.signedUrl) {
      console.error("[Attachment API] signed url error:", error?.message);
      return NextResponse.json(
        { success: false, message: "첨부 URL 발급에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: data.signedUrl });
  } catch (err) {
    console.error("[Attachment API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
