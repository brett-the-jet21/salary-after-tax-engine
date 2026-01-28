"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function fmt(n: string) {
  const raw = n.replace(/[^\d]/g, "");
  if (!raw) return "";
  const num = Number(raw);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString();
}

export default function SalaryJump({ initialSalary }: { initialSalary: number }) {
  const router = useRouter();
  const [value, setValue] = useState(String(initialSalary));

  const cleaned = useMemo(() => value.replace(/[^\d]/g, ""), [value]);
  const valid = cleaned.length > 0 && Number(cleaned) > 0;

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <label style={{ fontWeight: 600 }}>Try another salary:</label>

      <input
        inputMode="numeric"
        value={fmt(value)}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. 175000"
        style={{
          width: 220,
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #d7d7d7",
          fontSize: 16
        }}
      />

      <button
        onClick={() => {
          if (!valid) return;
          router.push(`/california/${Number(cleaned)}-salary-after-tax`);
        }}
        disabled={!valid}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #111",
          background: valid ? "#111" : "#aaa",
          color: "#fff",
          fontWeight: 700,
          cursor: valid ? "pointer" : "not-allowed"
        }}
      >
        View
      </button>

      <button
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #d7d7d7",
          background: "#fff",
          fontWeight: 700,
          cursor: "pointer"
        }}
      >
        Copy link
      </button>
    </div>
  );
}
