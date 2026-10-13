"use client";

import { useEffect, useState } from "react";
import { checkHealth } from "@/lib/api";

type State =
  | { phase: "checking" }
  | { phase: "online"; version: string; environment: string }
  | { phase: "offline" };

export default function BackendStatus() {
  const [state, setState] = useState<State>({ phase: "checking" });

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const health = await checkHealth();
        if (!cancelled) {
          setState({
            phase: "online",
            version: health.version,
            environment: health.environment,
          });
        }
      } catch {
        if (!cancelled) setState({ phase: "offline" });
      }
    };

    poll();
    const id = setInterval(poll, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const dot =
    state.phase === "online"
      ? "bg-emerald-400"
      : state.phase === "offline"
      ? "bg-red-400"
      : "bg-amber-400 animate-pulse";

  const label =
    state.phase === "online"
      ? `API online · v${state.version} · ${state.environment}`
      : state.phase === "offline"
      ? "API offline"
      : "Checking API…";

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span data-testid="backend-status">{label}</span>
    </div>
  );
}
