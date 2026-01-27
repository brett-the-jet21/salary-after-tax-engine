import Link from "next/link";

const SALARIES = [
  60000, 80000, 100000, 120000, 150000, 200000, 250000, 300000
];

export const metadata = {
  title: "California Salary After Tax – Take-Home Pay Calculator + Salary Pages (2026)",
  description: "Explore California salary after tax estimates for common salaries and open the full paycheck calculator with deductions and filing status."
};

export default function CaliforniaHub() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.1 }}>California Salary After Tax</h1>
      <p style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.7 }}>
        Browse salary pages or jump into the full calculator. These pages are designed for fast lookup and SEO.
      </p>

      <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginTop: 0 }}>Popular salary pages</h2>
        <ul style={{ paddingLeft: 18, lineHeight: 1.9, margin: "10px 0 0 0" }}>
          {SALARIES.map((s) => (
            <li key={s}>
              <Link href={`/california/salary/${s}-after-tax`}>${s.toLocaleString()} after tax in CA</Link>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 14 }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              padding: "10px 14px",
              fontWeight: 900,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.14)"
            }}
          >
            Open full calculator →
          </a>
        </div>
      </div>
    </main>
  );
}
