"use client";

import RelatedSalaryLinks from "./RelatedSalaryLinks";

export default function InternalLinks() {
  return (
    <div style={{ marginTop: 32 }}>
      <div
        style={{
          padding: "12px 14px",
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          background: "#fff",
          marginBottom: 16
        }}
      >
        <strong style={{ display: "block", marginBottom: 6 }}>
          Want to compare salary ranges quickly?
        </strong>
        <a href="/california/salary-comparison" style={{ fontWeight: 700 }}>
          Compare California salaries (every $5k) →
        </a>
      </div>

      <RelatedSalaryLinks />
    </div>
  );
}
