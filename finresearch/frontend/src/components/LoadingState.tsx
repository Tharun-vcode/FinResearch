export default function LoadingState({ company }: { company: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-500" />
        <p className="text-sm text-slate-700">
          Running research for <span className="font-semibold">{company}</span>…
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-1/3 rounded bg-slate-200" />
            <div className="mt-4 h-3 w-full rounded bg-slate-100" />
            <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
            <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
