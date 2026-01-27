"use client";

import { CA_SALARY_PAGES } from "./caSalaryLinks";

const wrap = {
  marginTop: 28,
  paddingTop: 18,
  borderTop: "1px solid #eee"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 10
};

const aStyle = {
  display: "block",
  padding: "10px 12px",
  border: "1px solid #e6e6e6",
  borderRadius: 12,
  background: "#fafafa",
  textDecoration: "none",
  color: "#111",
  fontWeight: 600
};

const small = { fontSize: 12, color: "#666", marginTop: 6, fontWeight: 500 };

export default function InternalLinks() {
  return (
    <section style={wrap} aria-label="Related California salary after tax pages">
      <h3 style={{ margin: 0, fontSize: 16 }}>Related California salary pages</h3>
      <div style={small}>
        Explore nearby salaries to compare take-home pay (great for negotiating offers).
      </div>

      <div style={grid}>
        {CA_SALARY_PAGES.map((p) => (
          <a key={p.href} href={p.href} style={aStyle}>
            {p.label}
          </a>
        ))}
      </div>
    </section>
  );
}
