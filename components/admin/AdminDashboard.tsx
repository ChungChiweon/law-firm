"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw, Inbox,
  LayoutList, LayoutGrid, ChevronLeft, ChevronRight,
  AlertTriangle, FlaskConical, Info, LogOut,
} from "lucide-react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminConsultationTable } from "@/components/admin/AdminConsultationTable";
import { AdminConsultationCard } from "@/components/admin/AdminConsultationCard";
import { AdminConsultationDetail } from "@/components/admin/AdminConsultationDetail";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { STATUS_CONFIG } from "@/lib/constants/admin";
import { cn } from "@/lib/utils/cn";
import type { AdminConsultation, ConsultationStatus } from "@/lib/supabase/types";

// ── 데모용 Mock 데이터 (Supabase 미설정 시 표시) ────────
const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86400_000).toISOString();
const hoursAgo = (h: number) => new Date(now - h * 3600_000).toISOString();

const MOCK_CONSULTATIONS: AdminConsultation[] = [
  {
    id: "demo-1",
    name: "김○○",
    phone: "010-****-0001",
    area: "dating_violence",
    region: "서울 강남구",
    opponent_type: "victim_self",
    content: "[데모] 교제 중 폭행을 당했습니다. 고소 방법과 증거 보전 방법을 알고 싶습니다.",
    contact_time: "afternoon",
    privacy_agreed: true,
    preferred_at: null,
    attachments: [],
    status: "new",
    source: "landing",
    memo: null,
    created_at: hoursAgo(1),
    updated_at: null,
  },
  {
    id: "demo-2",
    name: "이○○",
    phone: "010-****-0002",
    area: "stalking",
    region: "서울 서초구",
    opponent_type: "victim_self",
    content: "[데모] 전 남자친구가 계속 연락하고 집 앞에 나타납니다. 스토킹으로 신고할 수 있는지 문의드립니다.",
    contact_time: "morning",
    privacy_agreed: true,
    preferred_at: null,
    attachments: [],
    status: "contacted",
    source: "landing",
    memo: "오전 중 전화 연결 완료. 경찰 신고 방향 안내 예정.",
    created_at: daysAgo(1),
    updated_at: hoursAgo(20),
  },
  {
    id: "demo-3",
    name: "박○○",
    phone: "010-****-0003",
    area: "digital_sex",
    region: "경기 성남시",
    opponent_type: "family_support",
    content: "[데모] 딸이 불법 촬영 피해를 입었습니다. 영상 삭제 요청과 고소 방법을 상담하고 싶습니다.",
    contact_time: "anytime",
    privacy_agreed: true,
    preferred_at: daysAgo(-2),
    attachments: [
      { path: "demo/screenshot.png", name: "대화캡처.png", size: 428_000 },
      { path: "demo/report.pdf", name: "병원진단서.pdf", size: 1_240_000 },
    ],
    status: "reviewing",
    source: "kakao",
    memo: "디지털 성범죄 특화 검토 진행 중. 방통심의위 신고 병행 검토.",
    created_at: daysAgo(3),
    updated_at: daysAgo(2),
  },
  {
    id: "demo-4",
    name: "최○○",
    phone: "010-****-0004",
    area: "workplace_sex",
    region: "서울 마포구",
    opponent_type: "victim_self",
    content: "[데모] 직장 상사로부터 지속적인 성희롱을 당했습니다. 회사 내 신고와 법적 대응 방법을 알고 싶습니다.",
    contact_time: "evening",
    privacy_agreed: true,
    preferred_at: null,
    attachments: [],
    status: "retained",
    source: "landing",
    memo: "수임 완료. 고소장 준비 중. 다음 주 경찰서 동행 예정.",
    created_at: daysAgo(7),
    updated_at: daysAgo(5),
  },
  {
    id: "demo-5",
    name: "정○○",
    phone: "010-****-0005",
    area: "domestic_violence",
    region: "부산 해운대구",
    opponent_type: "victim_self",
    content: "[데모] 남편의 지속적인 폭행으로 아이들과 함께 피해있습니다. 긴급 접근금지 신청이 필요합니다.",
    contact_time: "morning",
    privacy_agreed: true,
    preferred_at: null,
    attachments: [],
    status: "new",
    source: "phone",
    memo: null,
    created_at: hoursAgo(0.5),
    updated_at: null,
  },
  {
    id: "demo-6",
    name: "강○○",
    phone: "010-****-0006",
    area: "camera_crime",
    region: "인천 연수구",
    opponent_type: "victim_self",
    content: "[데모] 화장실에서 몰래 촬영된 것 같습니다. 어디에 신고해야 하는지 모르겠습니다.",
    contact_time: "afternoon",
    privacy_agreed: true,
    preferred_at: null,
    attachments: [],
    status: "closed",
    source: "landing",
    memo: "경찰 신고 완료 후 사건 종결.",
    created_at: daysAgo(14),
    updated_at: daysAgo(10),
  },
];

// ── 타입 ──────────────────────────────────────────────
interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type ViewMode = "table" | "card";
type LoadState = "idle" | "loading" | "error";

const LIMIT = 20;

export function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
  };

  const hasEnv = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const isDemoMode = !hasEnv;

  const [items, setItems]           = useState<AdminConsultation[]>(isDemoMode ? MOCK_CONSULTATIONS : []);
  const [pagination, setPagination] = useState<PaginationMeta>(
    isDemoMode
      ? { page: 1, limit: MOCK_CONSULTATIONS.length, total: MOCK_CONSULTATIONS.length, totalPages: 1 }
      : { page: 1, limit: LIMIT, total: 0, totalPages: 0 }
  );
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [errorMsg, setErrorMsg]   = useState("");
  const [search, setSearch]       = useState("");
  const [area, setArea]           = useState("");
  const [status, setStatus]       = useState("");
  const [page, setPage]           = useState(1);
  const [view, setView]           = useState<ViewMode>("table");
  const [selected, setSelected]   = useState<AdminConsultation | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 데이터 조회 (실제 모드) ──────────────────────────
  const fetchData = useCallback(async (
    p: number, s: string, a: string, st: string
  ) => {
    if (isDemoMode) return;
    setLoadState("loading");
    try {
      const params = new URLSearchParams({
        page: String(p), limit: String(LIMIT),
        ...(s  && { search: s }),
        ...(a  && { area: a }),
        ...(st && { status: st }),
      });
      const res  = await fetch(`/api/admin/consultations?${params}`);
      const json = await res.json() as {
        success: boolean;
        data?: AdminConsultation[];
        pagination?: PaginationMeta;
        message?: string;
      };
      if (!res.ok || !json.success) throw new Error(json.message ?? "조회 실패");
      setItems(json.data ?? []);
      setPagination(json.pagination ?? { page: p, limit: LIMIT, total: 0, totalPages: 0 });
      setLoadState("idle");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "알 수 없는 오류");
      setLoadState("error");
    }
  }, [isDemoMode]);

  // 검색어 디바운스 (실제 모드)
  useEffect(() => {
    if (isDemoMode) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchData(1, search, area, status);
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, area, status, isDemoMode]);

  // 페이지 변경 (실제 모드)
  useEffect(() => {
    if (isDemoMode || page === 1) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(page, search, area, status);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleReset = () => {
    setSearch(""); setArea(""); setStatus(""); setPage(1);
  };

  const handleUpdated = (id: string, changes: { status?: ConsultationStatus; memo?: string | null }) => {
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, ...changes } : item)
    );
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, ...changes } : null);
    }
  };

  // ── 데모 모드: 클라이언트 사이드 필터 ───────────────
  const displayItems = isDemoMode
    ? MOCK_CONSULTATIONS.filter((item) => {
        if (search) {
          const q = search.toLowerCase();
          if (!item.name.toLowerCase().includes(q) && !item.content.toLowerCase().includes(q)) return false;
        }
        if (area && item.area !== area) return false;
        if (status && item.status !== status) return false;
        return true;
      })
    : items;

  // ── 통계 (전체 기준) ────────────────────────────────
  const baseItems = isDemoMode ? MOCK_CONSULTATIONS : items;
  const stats = (Object.keys(STATUS_CONFIG) as ConsultationStatus[]).map((s) => ({
    status: s,
    count: baseItems.filter((i) => i.status === s).length,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 관리자 헤더 */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0a1628]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7L12 3z" fill="#f59e0b" />
              </svg>
            </div>
            <div>
              <p className="text-[0.8125rem] font-bold text-slate-900">성범죄 피해 상담센터</p>
              <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-amber-600">Admin CRM</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isDemoMode && (
              <span className="hidden items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[0.6875rem] font-bold text-amber-700 sm:flex">
                <FlaskConical size={11} />
                데모 모드
              </span>
            )}
            {!isDemoMode && (
              <button
                onClick={() => fetchData(page, search, area, status)}
                disabled={loadState === "loading"}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-600 disabled:opacity-50"
                aria-label="새로고침"
              >
                <RefreshCw size={14} className={cn(loadState === "loading" && "animate-spin")} />
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[0.75rem] font-medium text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              aria-label="로그아웃"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:py-8">

        {/* 시연용 안내 배너 (항상 표시) */}
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
          <Info size={15} className="mt-0.5 shrink-0 text-blue-500" />
          <p className="text-[0.75rem] text-blue-700">
            <strong>현재는 시연용 관리자 화면입니다.</strong>{" "}
            실제 운영 전 접근 제한이 필요합니다. (로그인 또는 IP 제한 별도 적용 요망)
          </p>
        </div>

        {/* 데모 모드 안내 배너 */}
        {isDemoMode && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
            <FlaskConical size={16} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="text-[0.8125rem] font-bold text-amber-800">데모 데이터입니다</p>
              <p className="mt-0.5 text-[0.75rem] text-amber-700">
                Supabase 환경변수가 설정되지 않아 샘플 데이터로 화면을 표시합니다.
                실제 운영 시 <code className="rounded bg-amber-100 px-1 font-mono text-[0.6875rem]">.env.local</code>에
                Supabase URL / ANON KEY를 입력하면 실제 상담 데이터가 표시됩니다.
                필터·검색·상세 보기는 데모 모드에서도 모두 작동합니다.
              </p>
            </div>
          </div>
        )}

        {/* 페이지 타이틀 */}
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">상담 접수 관리</h1>
          <p className="mt-1 text-sm text-slate-500">
            접수된 상담 신청을 검토하고 상태를 관리합니다.
            {isDemoMode && <span className="ml-1.5 font-semibold text-amber-600">— 샘플 6건 표시 중</span>}
          </p>
        </div>

        {/* 상태별 요약 카드 */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {stats.map(({ status: s, count }) => (
            <button
              key={s}
              onClick={() => { setStatus(s === status ? "" : s); setPage(1); }}
              className={cn(
                "rounded-xl border p-3 text-center transition hover:shadow-sm",
                status === s
                  ? "border-amber-300 bg-amber-50 shadow-[0_0_0_2px_rgba(245,158,11,0.15)]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <p className="text-lg font-black text-slate-900 sm:text-xl">{count}</p>
              <div className="mt-1 flex justify-center">
                <StatusBadge status={s} size="sm" />
              </div>
            </button>
          ))}
        </div>

        {/* 필터 + 뷰 토글 */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <AdminFilters
              search={search} area={area} status={status}
              onSearchChange={setSearch}
              onAreaChange={(v) => { setArea(v); setPage(1); }}
              onStatusChange={(v) => { setStatus(v); setPage(1); }}
              onReset={handleReset}
              total={isDemoMode ? displayItems.length : pagination.total}
            />
          </div>
          <div className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 sm:flex">
            <ViewToggleBtn active={view === "table"} onClick={() => setView("table")}>
              <LayoutList size={15} />
            </ViewToggleBtn>
            <ViewToggleBtn active={view === "card"} onClick={() => setView("card")}>
              <LayoutGrid size={15} />
            </ViewToggleBtn>
          </div>
        </div>

        {/* 데이터 영역 */}
        {loadState === "error" ? (
          <ErrorState message={errorMsg} onRetry={() => fetchData(page, search, area, status)} />
        ) : loadState === "loading" && displayItems.length === 0 ? (
          <LoadingState />
        ) : displayItems.length === 0 ? (
          <EmptyState onReset={handleReset} hasFilter={!!(search || area || status)} />
        ) : (
          <>
            <div className="lg:hidden">
              <div className="grid gap-3">
                {displayItems.map((item) => (
                  <AdminConsultationCard key={item.id} item={item} onClick={() => setSelected(item)} />
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              {view === "table" ? (
                <AdminConsultationTable items={displayItems} onSelect={setSelected} />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {displayItems.map((item) => (
                    <AdminConsultationCard key={item.id} item={item} onClick={() => setSelected(item)} />
                  ))}
                </div>
              )}
            </div>

            {!isDemoMode && pagination.totalPages > 1 && (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              />
            )}
          </>
        )}
      </main>

      {selected && (
        <AdminConsultationDetail
          item={selected}
          onClose={() => setSelected(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}

// ── 서브 컴포넌트들 ──────────────────────────────────

function ViewToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md transition",
        active ? "bg-[#0a1628] text-white" : "text-slate-400 hover:text-slate-600"
      )}
    >
      {children}
    </button>
  );
}

function Pagination({ page, totalPages, onPrev, onNext }: {
  page: number; totalPages: number; onPrev: () => void; onNext: () => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      <button
        onClick={onPrev} disabled={page <= 1}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={15} /> 이전
      </button>
      <span className="text-sm text-slate-500">
        <strong className="text-slate-800">{page}</strong> / {totalPages}
      </span>
      <button
        onClick={onNext} disabled={page >= totalPages}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        다음 <ChevronRight size={15} />
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-xl bg-slate-100" />
      ))}
    </div>
  );
}

function EmptyState({ onReset, hasFilter }: { onReset: () => void; hasFilter: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <Inbox size={24} className="text-slate-400" />
      </div>
      <p className="mt-4 font-semibold text-slate-700">
        {hasFilter ? "검색 결과가 없습니다" : "아직 접수된 상담이 없습니다"}
      </p>
      <p className="mt-1.5 text-sm text-slate-400">
        {hasFilter
          ? "다른 검색어나 필터를 시도해 보세요."
          : "랜딩페이지에서 상담 신청이 들어오면 여기에 표시됩니다."}
      </p>
      {hasFilter && (
        <button
          onClick={onReset}
          className="mt-4 rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 py-16 text-center">
      <AlertTriangle size={28} className="text-red-400" />
      <p className="mt-3 font-semibold text-red-700">데이터를 불러오지 못했습니다</p>
      <p className="mt-1.5 max-w-sm text-sm text-red-500">{message}</p>
      <button
        onClick={onRetry}
        className="mt-5 rounded-lg bg-red-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-600"
      >
        다시 시도
      </button>
    </div>
  );
}
