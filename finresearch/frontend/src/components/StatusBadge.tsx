import type { SectionStatus } from "@/types/research";

const STYLES: Record<SectionStatus, { label: string; className: string }> = {
  ready: {
    label: "Ready",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  pending_integration: {
    label: "Not connected yet",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  error: {
    label: "Error",
    className: "bg-red-50 text-red-700 ring-red-200",
  },
};

export default function StatusBadge({ status }: { status: SectionStatus }) {
  const style = STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style.className}`}
    >
      {style.label}
    </span>
  );
}
