import type { HealthResponse, ResearchResponse } from "@/types/research";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    const detail = body?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length > 0) {
      return detail
        .map((d: { msg?: string }) => d.msg)
        .filter(Boolean)
        .join("; ")
        .replace(/Value error, /g, "");
    }
  } catch {
    // body was not JSON; fall through
  }
  return `Request failed with status ${res.status}`;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = init.body
    ? { "Content-Type": "application/json", ...init.headers }
    : { ...init.headers };

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new ApiError(
      `Cannot reach the backend at ${API_BASE_URL}. Make sure FastAPI is running.`
    );
  }

  if (!res.ok) {
    throw new ApiError(await extractErrorMessage(res), res.status);
  }
  return (await res.json()) as T;
}

export function checkHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return request<HealthResponse>("/health", { signal });
}

export function runResearch(
  company: string,
  signal?: AbortSignal
): Promise<ResearchResponse> {
  return request<ResearchResponse>("/research", {
    method: "POST",
    body: JSON.stringify({ company }),
    signal,
  });
}
