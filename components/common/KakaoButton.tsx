import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { SITE_CONFIG } from "@/lib/constants/site";

interface KakaoButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function KakaoButton({
  size = "md",
  className,
  label = "카카오톡 상담",
}: KakaoButtonProps) {
  const sizeMap = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg",
  };

  return (
    <Link
      href={SITE_CONFIG.contact.kakaoChannelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200",
        "bg-[#FEE500] text-[#3A1D1D] hover:bg-[#e6ce00] active:scale-95",
        sizeMap[size],
        className
      )}
    >
      <KakaoIcon />
      {label}
    </Link>
  );
}

function KakaoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3C6.477 3 2 6.582 2 11c0 2.8 1.61 5.267 4.063 6.824L5.06 21.1a.5.5 0 0 0 .72.547l4.163-2.773A11.27 11.27 0 0 0 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z" />
    </svg>
  );
}
