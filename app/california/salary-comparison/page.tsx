export const metadata = {
  title: "California Salary Comparison (After Tax) – $50k to $500k",
  description:
    "Compare California take-home pay for salaries from $50,000 to $500,000 in $5,000 increments. Fast, accurate, and free."
};

const amounts = Array.from({ length: ((500000 - 50000) / 5000) + 1 }, (_, i) => 50000 + i * 5000);

export default function Page() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 16px" }}>
      <h1>California Salary Comparison (After Tax)</h1>
      <p style={{ color: "#555" }}>
        Browse salary pages in <strong>$5,000 increments</strong> to compare take-home pay and negotiate offers with confidence.
      </p>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          background: "#fff"
        }}
      >
        <h2 style={{ marginTop: 0 }}>All salary ranges</h2>

        <ul
          style={{
            columns: 2,
            WebkitColumns: 2,
            listStyle: "none",
            paddingLeft: 0,
            margin: 0
          }}
        >
          {amounts.map((a) => (
            <li key={a} style={{ padding: "6px 0" }}>
              <a href={`/salary/${a}-after-tax-california`}>
                ${a.toLocaleString()} salary after tax in California
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: 24, fontSize: 14, color: "#666" }}>
        Tip: click a few nearby salaries to compare monthly take-home before you negotiate.
      </p>
    </main>
  );
}
