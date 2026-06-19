import { cn } from "@/lib/utils/cn";
import { STATUS_CONFIG } from "@/lib/constants/admin";
import type { ConsultationStatus } from "@/lib/supabase/types";

interface StatusBadgeProps {
  status: ConsultationStatus;
  size?: "sm" | "md";
}

const COLOR_MAP = {
  blue:  "bg-blue-50  text-blue-700  border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
  green: "bg-green-50 text-green-700 border-green-200",
  zinc:  "bg-zinc-100  text-zinc-500  border-zinc-200",
};

const DOT_MAP = {
  blue:  "bg-blue-500",
  amber: "bg-amber-500",
  slate: "bg-slate-400",
  green: "bg-green-500",
  zinc:  "bg-zinc-400",
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        COLOR_MAP[cfg.color],
        size === "sm" ? "px-2 py-0.5 text-[0.6875rem]" : "px-2.5 py-1 text-xs"
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT_MAP[cfg.color])} />
      {cfg.label}
    </span>
  );
}
