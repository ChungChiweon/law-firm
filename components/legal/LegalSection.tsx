interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-3.5">
        <h2 className="text-[0.875rem] font-bold text-slate-800">{title}</h2>
      </div>
      <div className="px-6 py-5 text-[0.875rem] leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 first:mt-0">{children}</p>;
}

export function LegalSubTitle({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 font-semibold text-slate-800 first:mt-0">{children}</p>;
}
