export default function InternalLinks() {
  const links = [
    ["/salary/50000-after-tax-california", "$50k After Tax (CA)"],
    ["/salary/75000-after-tax-california", "$75k After Tax (CA)"],
    ["/salary/100000-after-tax-california", "$100k After Tax (CA)"],
    ["/salary/150000-after-tax-california", "$150k After Tax (CA)"],
    ["/salary/200000-after-tax-california", "$200k After Tax (CA)"],
    ["/salary/250000-after-tax-california", "$250k After Tax (CA)"],
    ["/salary/300000-after-tax-california", "$300k After Tax (CA)"],
    ["/hourly/20-an-hour-after-tax-california", "$20/hr After Tax"],
    ["/hourly/30-an-hour-after-tax-california", "$30/hr After Tax"],
    ["/hourly/40-an-hour-after-tax-california", "$40/hr After Tax"]
  ];

  return (
    <section style={{ maxWidth: 980, margin: "32px auto", padding: "16px" }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>
        Popular California Take-Home Pay Examples
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {links.map(([href, label]) => (
          <a
            key={href}
            href={href}
            style={{
              fontSize: 13,
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid #eaeaea",
              textDecoration: "none",
              color: "#111",
              background: "#fff"
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
