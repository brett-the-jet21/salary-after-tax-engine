export const metadata = {
  title: "$75k Salary After Tax in California (2026) — Take-Home Pay",
  description: "Estimate take-home pay on a $75k salary in California after federal tax, FICA, CA income tax, and CA SDI. Fast, accurate, free.",
  alternates: { canonical: "/salary/75000-after-tax-california" }
};

export default function Page() {
  const AMOUNT = 75000;
  const pretty = "$" + AMOUNT.toLocaleString("en-US");

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.2 }}>
        {pretty} Salary After Tax in California
      </h1>

      <p style={{ marginTop: 12, color: "#333", lineHeight: 1.7 }}>
        Use the calculator to estimate take-home pay after federal income tax, FICA (Social Security + Medicare),
        California income tax, and CA SDI. Results vary by filing status and deductions.
      </p>

      <div style={{
        marginTop: 16,
        padding: 18,
        borderRadius: 14,
        border: "1px solid #eaeaea",
        background: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
      }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Get your exact take-home pay</h2>
        <ol style={{ marginTop: 10, color: "#333", lineHeight: 1.7 }}>
          <li>Open the calculator.</li>
          <li>Enter {pretty} as your annual salary.</li>
          <li>Select filing status and pay frequency to see your breakdown.</li>
        </ol>

        <a href="/" style={{
          display: "inline-block",
          marginTop: 10,
          textDecoration: "none",
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid #111",
          color: "#111",
          fontWeight: 800
        }}>
          Open the Calculator →
        </a>
      </div>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 18 }}>What changes your net pay?</h2>
        <ul style={{ color: "#333", lineHeight: 1.7 }}>
          <li><strong>Filing status</strong> (brackets + deductions)</li>
          <li><strong>Pre-tax contributions</strong> (401(k), HSA, some benefits)</li>
          <li><strong>Bonuses</strong> and supplemental wage withholding</li>
          <li><strong>Pay frequency</strong> (annual/monthly/biweekly/weekly)</li>
        </ul>

        <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6 }}>
          Estimates for planning and comparison. For complex situations (stock comp, multiple jobs), consult a professional.
        </p>
      </section>

      <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
        <a href="/salary/100000-after-tax-california">$100k</a>
        <a href="/salary/150000-after-tax-california">$150k</a>
        <a href="/salary/200000-after-tax-california">$200k</a>
        <a href="/salary/250000-after-tax-california">$250k</a>
        <a href="/salary/300000-after-tax-california">$300k</a>
      </div>
    </main>
  );
}
