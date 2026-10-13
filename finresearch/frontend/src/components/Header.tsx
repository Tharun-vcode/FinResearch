import BackendStatus from "./BackendStatus";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 text-sm font-bold text-slate-900">
            FR
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight text-white">
              FinResearch Terminal
            </h1>
            <p className="text-xs text-slate-400">
              Company intelligence &amp; due diligence
            </p>
          </div>
        </div>
        <BackendStatus />
      </div>
    </header>
  );
}
