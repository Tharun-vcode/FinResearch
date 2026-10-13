"use client";

import { FormEvent, useState } from "react";

const SUGGESTIONS = ["Apple Inc.", "Tesla", "Microsoft", "NVIDIA"];

interface Props {
  loading: boolean;
  onSubmit: (company: string) => void;
}

export default function SearchPanel({ loading, onSubmit }: Props) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
  };

  const handleSuggestion = (name: string) => {
    if (loading) return;
    setValue(name);
    onSubmit(name);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Company research
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={120}
          placeholder="Enter a company name, e.g. Apple Inc."
          aria-label="Company name"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
        <button
          type="submit"
          disabled={!trimmed || loading}
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Researching…" : "Research"}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>Try:</span>
        {SUGGESTIONS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleSuggestion(name)}
            disabled={loading}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 disabled:opacity-50"
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}
