import Link from "next/link";

export const metadata = {
  title: "California Salary After Tax by Salary (2026 Take-Home Pay)",
  description:
    "Browse popular California salary take-home pay pages. See after-tax pay for common salaries with federal + CA state tax, FICA, and SDI. Updated for 2026."
};

const POPULAR = [
  40000, 50000, 60000, 75000, 90000, 100000, 120000, 150000, 200000, 250000, 300000
];

export default function SalaryHub() {
  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <h1>California Salary After Tax (Browse by Salary)</h1>

      <p style={{ marginTop: 10, color: "#444" }}>
        Pick a salary to see estimated take-home pay after federal taxes, California state tax,
        FICA, and CA SDI. Updated for 2026.
      </p>

      <h2 style={{ marginTop: 24 }}>Popular salary pages</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 12
        }}
      >
        {POPULAR.map((s) => (
          <Link
            key={s}
            href={`/salary/${s}-after-tax-california`}
            style={{
              display: "inline-block",
              padding: "10px 14px",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              background: "#fff",
              textDecoration: "none",
              color: "#111"
            }}
          >
            ${s.toLocaleString()} after tax
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: 28 }}>More salaries</h2>
      <p style={{ color: "#444" }}>
        Tip: you can change the number in the URL, like{" "}
        <code>/salary/85000-after-tax-california</code>.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Last updated: 2026
      </p>
    </main>
  );
}
