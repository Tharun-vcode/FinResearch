export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h3 className="text-base font-semibold text-slate-800">
        No research yet
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Enter a company name above and press <strong>Research</strong> to
        generate a report. Each section below will be populated as data sources
        are connected.
      </p>
    </div>
  );
}
