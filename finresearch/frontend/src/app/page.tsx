"use client";

import { useRef, useState } from "react";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import ResultView from "@/components/ResultView";
import SearchPanel from "@/components/SearchPanel";
import { runResearch } from "@/lib/api";
import type { ResearchResponse } from "@/types/research";

type ViewState =
  | { phase: "idle" }
  | { phase: "loading"; company: string }
  | { phase: "error"; company: string; message: string }
  | { phase: "success"; data: ResearchResponse };

export default function HomePage() {
  const [view, setView] = useState<ViewState>({ phase: "idle" });
  const controllerRef = useRef<AbortController | null>(null);

  const handleResearch = async (company: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setView({ phase: "loading", company });

    try {
      const data = await runResearch(company, controller.signal);
      setView({ phase: "success", data });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setView({ phase: "error", company, message });
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <SearchPanel
          loading={view.phase === "loading"}
          onSubmit={handleResearch}
        />

        {view.phase === "idle" && <EmptyState />}
        {view.phase === "loading" && <LoadingState company={view.company} />}
        {view.phase === "error" && (
          <ErrorState
            message={view.message}
            onRetry={() => handleResearch(view.company)}
          />
        )}
        {view.phase === "success" && <ResultView data={view.data} />}
      </main>
    </>
  );
}
