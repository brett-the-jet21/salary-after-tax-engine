"use client";

import { useState } from "react";
import Link from "next/link";

const salaries = [
  { amount: 225000, label: "Nearby offer range" },
  { amount: 250000, label: "Typical senior role" },
  { amount: 275000, label: "Strong negotiation leverage" },

  { amount: 200000, label: "FAANG / Big Tech entry" },
  { amount: 300000, label: "Director / Senior IC" },
  { amount: 400000, label: "Executive compensation" },

  { amount: 500000, label: "Top 1% earners" },
  { amount: 750000, label: "C-suite / Equity heavy" },
  { amount: 1000000, label: "Ultra-high income" },

  { amount: 150000 },
  { amount: 175000 },
  { amount: 325000 },
  { amount: 350000 },
  { amount: 375000 },
  { amount: 425000 },
  { amount: 450000 },
  { amount: 475000 },
  { amount: 525000 },
  { amount: 550000 },
  { amount: 575000 },
  { amount: 600000 },
  { amount: 625000 }
];

export default function RelatedSalaryLinks() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section style={{ marginTop: 48 }}>
      <h2>Related California salary pages</h2>
      <p style={{ color: "#555", marginBottom: 16 }}>
        Compare nearby salaries to <strong>negotiate better offers</strong> and avoid tax surprises.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16
        }}
      >
        {salaries.map((s, i) => {
          if (i >= 9 && !expanded) return null;

          return (
            <Link
              key={s.amount}
              href={`/salary/${s.amount}-after-tax-california`}
              style={{
                padding: 16,
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                textDecoration: "none",
                color: "#000",
                background: "#fff"
              }}
            >
              <strong>${s.amount.toLocaleString()} salary after tax in California</strong>

              {s.label && (
                <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
                  {s.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          style={{
            marginTop: 20,
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Show more salary ranges →
        </button>
      )}

      <p style={{ marginTop: 24, fontSize: 14, color: "#666" }}>
        💡 Want exact numbers for <strong>your</strong> offer? Use the calculator above.
      </p>
    </section>
  );
}
