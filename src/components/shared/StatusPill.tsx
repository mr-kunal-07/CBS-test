import { ExternalLink, SquarePenIcon } from "lucide-react";

export type StatusPillTone = "success" | "neutral" | "pending" | "rejected";

interface StatusPillProps {
  label: string;
  tone?: StatusPillTone;
}

const TONE_CLASSES: Record<NonNullable<StatusPillProps["tone"]>, { pill: string; dot: string }> = {
  success: { pill: "border-emerald-500 bg-emerald-50 text-emerald-600 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-700 dark:bg-emerald-400" },
  neutral: { pill: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400", dot: "bg-slate-400 dark:bg-slate-500" },
  pending: { pill: "border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500 dark:bg-amber-400" },
  rejected: { pill: "border-red-300 bg-red-50 text-red-600 dark:border-red-700 dark:bg-red-900/30 dark:text-red-400", dot: "bg-red-500 dark:bg-red-400" },
};

export default function StatusPill({ label, tone = "success" }: StatusPillProps) {
  const { pill, dot } = TONE_CLASSES[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-medium whitespace-nowrap ${pill}`}>
      <span className={`h-2 w-1.5 rounded-full ${dot}`} />
      {label}
      <SquarePenIcon size={12} />
    </span>
  );
}
