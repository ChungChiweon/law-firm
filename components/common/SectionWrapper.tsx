import { cn } from "@/lib/utils/cn";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: "white" | "slate" | "navy";
}

export function SectionWrapper({
  id,
  className,
  children,
  background = "white",
}: SectionWrapperProps) {
  const bgMap = {
    white: "bg-white",
    slate: "bg-slate-50",
    navy: "bg-[#060f1e]",
  };

  return (
    <section id={id} className={cn("w-full", bgMap[background], className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {children}
      </div>
    </section>
  );
}
