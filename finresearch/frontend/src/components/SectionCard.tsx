import type { ResearchSection } from "@/types/research";
import StatusBadge from "./StatusBadge";

export default function SectionCard({ section }: { section: ResearchSection }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">{section.title}</h3>
        <StatusBadge status={section.status} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {section.summary}
      </p>
      {section.items.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {section.items.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
