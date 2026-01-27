export const metadata = {
  title: "Salary After Tax in Orange County, CA (2026) — Take-Home Pay",
  description: "Estimate take-home pay in Orange County, California after federal tax, FICA, CA income tax, and CA SDI. Fast and accurate.",
  alternates: { canonical: "/california/orange-county" }
};

export default function Page() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>
        Salary After Tax in Orange County, California
      </h1>

      <p style={{ marginTop: 12, lineHeight: 1.7 }}>
        Use our California Salary After Tax Calculator to estimate your take-home pay in Orange County.
        Results include federal income tax, FICA payroll taxes, California state income tax,
        and CA SDI where applicable.
      </p>

      <div style={{
        marginTop: 16,
        padding: 18,
        borderRadius: 14,
        border: "1px solid #eaeaea",
        background: "#fff"
      }}>
        <h2 style={{ margin: 0 }}>Get your exact Orange County take-home pay</h2>
        <ol style={{ marginTop: 10 }}>
          <li>Open the calculator</li>
          <li>Enter your salary or hourly wage</li>
          <li>Select filing status and pay frequency</li>
        </ol>

        <a href="/" style={{
          display: "inline-block",
          marginTop: 10,
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid #111",
          fontWeight: 800,
          textDecoration: "none",
          color: "#111"
        }}>
          Open the Calculator →
        </a>
      </div>

      <section style={{ marginTop: 18 }}>
        <h2>Why take-home pay matters in Orange County</h2>
        <ul>
          <li>Cost of living varies across California</li>
          <li>Same salary ≠ same lifestyle</li>
          <li>Net pay helps compare job offers accurately</li>
        </ul>
      </section>
    </main>
  );
}
