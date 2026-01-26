import Link from "next/link";

export const metadata = {
  title: "California Hourly Pay After Tax (2026 Take-Home Pay by Hour)",
  description:
    "Browse popular California hourly take-home pay pages. See after-tax pay by hour with federal + CA state tax, FICA, and SDI. Updated for 2026."
};

const POPULAR = [15, 18, 20, 22, 25, 30, 35, 40, 45, 50, 60, 75, 100];

export default function HourlyHub() {
  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <h1>California Hourly Pay After Tax (Browse by Rate)</h1>

      <p style={{ marginTop: 10, color: "#444" }}>
        Pick an hourly rate to estimate take-home pay after federal taxes, California state tax,
        FICA, and CA SDI. Updated for 2026.
      </p>

      <h2 style={{ marginTop: 24 }}>Popular hourly pages</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
        {POPULAR.map((r) => (
          <Link
            key={r}
            href={`/hourly/${r}-an-hour-after-tax-california`}
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
            ${r}/hour after tax
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: 28 }}>More rates</h2>
      <p style={{ color: "#444" }}>
        Tip: you can change the number in the URL, like{" "}
        <code>/hourly/27-an-hour-after-tax-california</code>.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Last updated: 2026
      </p>
    </main>
  );
}
