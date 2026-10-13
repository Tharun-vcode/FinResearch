import type { ResearchResponse } from "@/types/research";
import SectionCard from "./SectionCard";

export default function ResultView({ data }: { data: ResearchResponse }) {
  const generated = new Date(data.generated_at).toLocaleString();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Research report
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">
          {data.company}
        </h2>
        <dl className="mt-4 grid gap-4 text-xs text-slate-500 sm:grid-cols-3">
          <div>
            <dt className="font-medium text-slate-400">Request ID</dt>
            <dd className="mt-0.5 break-all font-mono text-slate-700">
              {data.request_id}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-400">Generated</dt>
            <dd className="mt-0.5 text-slate-700">{generated}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-400">Backend time</dt>
            <dd className="mt-0.5 text-slate-700">{data.elapsed_ms} ms</dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.sections.map((section) => (
          <div
            key={section.key}
            className={section.key === "company_overview" ? "md:col-span-2" : ""}
          >
            <SectionCard section={section} />
          </div>
        ))}
      </div>
    </div>
  );
}
