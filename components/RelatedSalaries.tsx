import Link from "next/link";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function RelatedSalaries({
  salary,
  min = 30000,
  max = 300000
}: {
  salary: number;
  min?: number;
  max?: number;
}) {
  const steps = [-25000, -10000, -5000, 5000, 10000, 25000];

  const related = Array.from(
    new Set(
      steps
        .map((d) => clamp(salary + d, min, max))
        .filter((x) => x !== salary)
    )
  ).sort((a, b) => a - b);

  return (
    <section style={{ marginTop: 28 }}>
      <h2>Related California salary take-home pages</h2>
      <p style={{ marginTop: 8, color: "#444" }}>
        People also compare nearby salaries:
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 10
        }}
      >
        {related.map((s) => (
          <Link
            key={s}
            href={`/salary/${s}-after-tax-california`}
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
            ${s.toLocaleString()} after tax
          </Link>
        ))}
      </div>
    </section>
  );
}
