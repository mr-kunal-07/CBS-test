"use client";

import { Filter } from "lucide-react";
import { useBilingual } from "@/i18n/useBilingual";

export type AuthorizationTabKey = "new" | "modify" | "rejected";

export type AuthorizationTab = {
  key: AuthorizationTabKey;
  labelKey: string;
  count: number;
};

const TABS: AuthorizationTab[] = [
  { key: "new", labelKey: "authorizeAccount.tabs.newAuthorization", count: 10 },
  {
    key: "modify",
    labelKey: "authorizeAccount.tabs.modifyAuthorization",
    count: 6,
  },
  {
    key: "rejected",
    labelKey: "authorizeAccount.tabs.authorizeRejected",
    count: 6,
  },
];

type AuthorizationTabsProps = {
  active: AuthorizationTabKey;
  onChange: (key: AuthorizationTabKey) => void;
  onOpenFilter?: () => void;
};

const AuthorizationTabs = ({
  active,
  onChange,
  onOpenFilter,
}: AuthorizationTabsProps) => {
  const { tRaw } = useBilingual();

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{tRaw(tab.labelKey)}</span>
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  isActive
                    ? "bg-white text-primary"
                    : "bg-primary-50 text-primary"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onOpenFilter}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border-[1px] border-primary bg-primary-50 text-primary transition hover:bg-primary-100"
        aria-label="Filter"
      >
        <Filter size={22} strokeWidth={2} />
      </button>
    </div>
  );
};

export default AuthorizationTabs;
