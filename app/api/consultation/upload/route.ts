import { NextRequest, NextResponse } from "next/server";
import {
  CONSULTATION_BUCKET,
  getStorageClient,
  buildStoragePath,
} from "@/lib/storage";
import { MAX_FILE_SIZE, isAllowedType } from "@/lib/constants/upload";

// ── POST /api/consultation/upload ─────────────────────
// multipart/form-data 로 파일 하나를 받아 비공개 버킷에 저장하고
// 저장 경로·원본명·크기를 돌려줍니다. (상담 접수 시 함께 전송)
export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: "잘못된 요청 형식입니다." },
      { status: 400 }
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, message: "파일이 없습니다." },
      { status: 400 }
    );
  }

  // 검증 — 크기·형식
  if (file.size === 0) {
    return NextResponse.json(
      { success: false, message: "빈 파일은 첨부할 수 없습니다." },
      { status: 422 }
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { success: false, message: "파일 크기는 10MB 이하만 첨부할 수 있습니다." },
      { status: 422 }
    );
  }
  if (!isAllowedType(file.type)) {
    return NextResponse.json(
      { success: false, message: "이미지 또는 PDF 파일만 첨부할 수 있습니다." },
      { status: 422 }
    );
  }

  const path = buildStoragePath(file.name);

  try {
    const supabase = getStorageClient();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from(CONSULTATION_BUCKET)
      .upload(path, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("[Upload API] Storage error:", error.message);
      return NextResponse.json(
        {
          success: false,
          message:
            "파일 업로드에 실패했습니다. 파일 없이 접수하시거나 카카오톡으로 보내주세요.",
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[Upload API] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "파일 업로드에 실패했습니다. 파일 없이 접수하시거나 카카오톡으로 보내주세요.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    attachment: { path, name: file.name, size: file.size },
  });
}
