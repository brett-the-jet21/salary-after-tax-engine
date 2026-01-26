import Link from "next/link";

export default function RelatedHourly({ rate }: { rate: number }) {
  const steps = [-15, -10, -5, -2, 2, 5, 10, 15];
  const related = Array.from(
    new Set(
      steps
        .map((d) => Math.max(10, Math.min(200, rate + d)))
        .filter((x) => x !== rate)
    )
  ).sort((a, b) => a - b);

  return (
    <section style={{ marginTop: 28 }}>
      <h2>Related hourly rates in California</h2>
      <p style={{ marginTop: 8, color: "#444" }}>People also compare:</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
        {related.map((r) => (
          <Link
            key={r}
            href={`/hourly/${r}-an-hour-after-tax-california`}
            style={{
              display: "inline-block",
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              background: "#fff",
              textDecoration: "none",
              color: "#111"
            }}
          >
            ${r}/hour after tax
          </Link>
        ))}
      </div>
    </section>
  );
}
