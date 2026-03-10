"use client";

import { useEffect, useState } from "react";
import AdSlot from "./AdSlot";

const DEFAULT_SLOT = "5511951512";

const SLOT_BY_PLACEMENT: Record<string, string> = {
  "salary-above-fold":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_SALARY_ABOVE_FOLD || DEFAULT_SLOT,
  "salary-mid-content":
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_SALARY_MID_CONTENT || DEFAULT_SLOT
};

function normalizeSlot(slot: string) {
  const cleaned = String(slot || "").trim();
  return /^\d+$/.test(cleaned) ? cleaned : DEFAULT_SLOT;
}

export default function ClientOnlyAdUnit({
  slot,
  minHeight = 280
}: {
  slot: string;
  minHeight?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mappedSlot = SLOT_BY_PLACEMENT[slot] || slot;
  const resolvedSlot = normalizeSlot(mappedSlot);

  return (
    <div
      style={{
        marginTop: 16,
        minHeight,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#fff",
        padding: "8px 0"
      }}
    >
      {mounted ? <AdSlot slot={resolvedSlot} /> : null}
    </div>
  );
}
