"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, AlertCircle, Loader2, ShieldAlert } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { Suspense } from "react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setErrorMessage(data.error ?? "비밀번호가 올바르지 않습니다.");
        setStatus("error");
        setPassword("");
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      setStatus("error");
    }
  };

  return (
    <div className="relative z-10 mx-auto w-full max-w-sm px-4 py-12">
      {/* 로고 */}
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
          <Lock size={24} className="text-amber-400" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-amber-400/70">
            Admin Access
          </p>
          <h1 className="mt-0.5 text-xl font-extrabold text-white">
            관리자 접근
          </h1>
          <p className="mt-1.5 text-[0.8125rem] text-slate-500">
            {SITE_CONFIG.name} · 관리자 전용 화면
          </p>
        </div>
      </div>

      {/* 로그인 카드 */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm">
        <div className="border-b border-white/[0.06] px-6 py-3.5">
          <div className="flex items-center gap-2">
            <ShieldAlert size={13} className="text-amber-400/60" />
            <p className="text-[0.75rem] text-slate-500">
              접근 권한이 있는 담당자만 이용하세요.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          <label className="mb-1.5 block text-[0.8125rem] font-semibold text-slate-400">
            관리자 비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="비밀번호를 입력하세요"
              autoFocus
              autoComplete="current-password"
              className={cn(
                "h-12 w-full rounded-xl border bg-white/[0.05] px-4 pr-11 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                "focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20",
                status === "error"
                  ? "border-red-500/40 focus:border-red-400/60"
                  : "border-white/10 hover:border-white/20"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-slate-400"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* 오류 메시지 */}
          {status === "error" && (
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5">
              <AlertCircle size={13} className="shrink-0 text-red-400" />
              <p className="text-[0.8125rem] text-red-400">{errorMessage}</p>
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!password.trim() || status === "loading"}
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[0.9375rem] font-bold transition-all",
              "bg-amber-500 text-white shadow-[0_4px_20px_rgba(245,158,11,0.2)]",
              "hover:bg-amber-400 hover:shadow-[0_6px_28px_rgba(245,158,11,0.3)]",
              "disabled:cursor-not-allowed disabled:bg-amber-500/40 disabled:shadow-none"
            )}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                확인 중…
              </>
            ) : (
              <>
                <Lock size={15} />
                접속하기
              </>
            )}
          </button>
        </form>
      </div>

      {/* 홈 링크 */}
      <div className="mt-5 text-center">
        <Link
          href="/"
          className="text-[0.8125rem] text-slate-600 transition-colors hover:text-slate-400"
        >
          ← 사이트 홈으로 돌아가기
        </Link>
      </div>

      {/* MVP 안내 */}
      <div className="mt-6 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.05] px-4 py-3">
        <p className="text-center text-[0.75rem] leading-relaxed text-yellow-600/70">
          이 접근 방식은 MVP 보호장치입니다.
          실제 운영 전 더 강한 인증이 필요합니다.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#060f1e]">
      {/* 배경 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#0f2a50,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <Suspense fallback={<AdminLoginFallback />}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}

function AdminLoginFallback() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-sm px-4 py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-5 w-32 animate-pulse rounded bg-white/5" />
        <div className="mt-4 h-40 w-full animate-pulse rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
