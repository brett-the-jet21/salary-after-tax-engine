import Link from "next/link";

export const metadata = {
  title: "California Salary After Tax (2026) – Examples by Income",
  description:
    "Browse common California salary levels and see estimated take-home pay after federal tax, FICA, and California state tax."
};

const SALARIES = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000,
  85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000, 125000, 130000,
  135000, 140000, 145000, 150000, 155000, 160000, 165000, 170000, 175000,
  180000, 185000, 190000, 195000, 200000, 205000, 210000, 215000, 220000,
  225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000, 265000,
  270000, 275000, 280000, 285000, 290000, 295000, 300000
];

function money(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function SalaryIndexPage() {
  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        California Salary After Tax – Examples by Income
      </h1>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Pick a salary below to view an estimated California take-home pay breakdown
        (federal + FICA + California).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 18
        }}
      >
        {SALARIES.map((s) => (
          <Link
            key={s}
            href={`/salary/${s}-after-tax-california`}
            style={{
              display: "block",
              padding: 14,
              border: "1px solid #e6e6e6",
              borderRadius: 12,
              background: "#fff",
              textDecoration: "none",
              color: "#111"
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16 }}>${money(s)} / year</div>
            <div style={{ marginTop: 4, fontSize: 13, color: "#555" }}>
              View after-tax estimate →
            </div>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: 22, fontSize: 12, color: "#666" }}>
        Note: Estimates may vary based on deductions, credits, benefits, and other
        factors. This tool provides approximations for informational purposes.
      </p>
    </main>
  );
}
