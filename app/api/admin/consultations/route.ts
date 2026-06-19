import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { ConsultationStatus, AdminConsultationUpdate } from "@/lib/supabase/types";

// ── 공통: 서버 Supabase 클라이언트 ──────────────────
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase 환경변수 누락");
  return createClient(url, key);
}

// ── 허용 status 값 ───────────────────────────────────
const VALID_STATUSES = new Set<ConsultationStatus>([
  "new", "contacted", "reviewing", "retained", "closed",
]);

// ── GET /api/admin/consultations ─────────────────────
// Query params: search, area, status, page, limit
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = (searchParams.get("search") ?? "").trim();
  const area   = searchParams.get("area")   ?? "";
  const status = searchParams.get("status") ?? "";
  const page   = Math.max(1, Number(searchParams.get("page")  ?? "1"));
  const limit  = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? "20")));
  const offset = (page - 1) * limit;

  try {
    const supabase = getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from("consultations")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (area)   query = query.eq("area", area);
    if (status) query = query.eq("status", status);
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,phone.ilike.%${search}%,content.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("[Admin API GET] Supabase error:", error.message);
      return NextResponse.json(
        { success: false, message: "데이터 조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data ?? [],
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    });
  } catch (err) {
    console.error("[Admin API GET] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// ── PATCH /api/admin/consultations ───────────────────
// Body: { id, status?, memo? }
export async function PATCH(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "요청 데이터를 파싱할 수 없습니다." },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;

  if (!data.id || typeof data.id !== "string") {
    return NextResponse.json(
      { success: false, message: "id가 필요합니다." },
      { status: 400 }
    );
  }

  const updatePayload: AdminConsultationUpdate = {};

  if (data.status !== undefined) {
    if (typeof data.status !== "string" || !VALID_STATUSES.has(data.status as ConsultationStatus)) {
      return NextResponse.json(
        { success: false, message: "올바르지 않은 상태값입니다." },
        { status: 422 }
      );
    }
    updatePayload.status = data.status as ConsultationStatus;
  }

  if (data.memo !== undefined) {
    updatePayload.memo =
      data.memo === null || data.memo === ""
        ? null
        : typeof data.memo === "string"
        ? data.memo.slice(0, 2000)
        : null;
  }

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json(
      { success: false, message: "변경할 항목이 없습니다." },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("consultations")
      .update({ ...updatePayload, updated_at: new Date().toISOString() })
      .eq("id", data.id);

    if (error) {
      console.error("[Admin API PATCH] Supabase error:", error.message);
      return NextResponse.json(
        { success: false, message: "수정 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "수정되었습니다." });
  } catch (err) {
    console.error("[Admin API PATCH] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
