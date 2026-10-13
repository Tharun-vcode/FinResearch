export type SectionStatus = "ready" | "pending_integration" | "error";

export interface ResearchSection {
  key: string;
  title: string;
  status: SectionStatus;
  summary: string;
  items: string[];
}

export interface ResearchResponse {
  request_id: string;
  company: string;
  generated_at: string;
  elapsed_ms: number;
  sections: ResearchSection[];
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
}
