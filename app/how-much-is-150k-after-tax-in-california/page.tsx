import Link from "next/link";

export const metadata = {
  title: "How Much Is $150k After Tax in California? (2026)",
  description: "Estimate take-home pay for $150,000 salary in California for 2026. Includes federal tax, FICA, CA state tax, and CA SDI."
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this include California SDI?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the calculator estimates CA SDI alongside federal tax, FICA, and California state income tax." }
    },
    {
      "@type": "Question",
      "name": "Can I see monthly, biweekly, and weekly take-home pay?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — you can switch pay periods to see take-home pay and a matching tax breakdown for each." }
    },
    {
      "@type": "Question",
      "name": "Is this exact for everyone?",
      "acceptedAnswer": { "@type": "Answer", "text": "It’s an estimate designed for common scenarios. Your real paycheck can differ due to deductions, benefits, extra withholding, bonuses, and specific filing details." }
    }
  ]
};

export default function Page() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "28px 16px", lineHeight: 1.55 }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 34, margin: "0 0 10px 0" }}>How much is $150k after tax in California?</h1>
        <p style={{ margin: 0, color: "#374151" }}>Use the calculator to estimate take-home pay for $150,000 salary in California. Then switch pay periods to see your paycheck view.</p>
      </header>

      <section style={{ padding: "14px 16px", border: "1px solid #e5e7eb", borderRadius: 14, marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, margin: "0 0 10px 0" }}>Use the calculator</h2>
        <p style={{ margin: "0 0 12px 0", color: "#374151" }}>
          Get your take-home pay instantly (annual, monthly, biweekly, weekly) — includes federal, FICA, CA state tax, and CA SDI.
        </p>
        <Link href="/" style={{ display: "inline-block", padding: "10px 14px", borderRadius: 12, border: "1px solid #111827", textDecoration: "none" }}>
          Open California Salary After Tax Calculator →
        </Link>
      </section>

      <section style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 22, margin: "18px 0 10px 0" }}>What this page covers</h2>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Rough take-home estimate for $150k in CA</li><li>Why taxes rise with higher income</li><li>Paycheck view: monthly/biweekly/weekly</li>
        </ul>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, margin: "18px 0 10px 0" }}>FAQ</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {faqJsonLd.mainEntity.map((q: any, i: number) => (
            <details key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: "12px 14px" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{q.name}</summary>
              <p style={{ margin: "10px 0 0 0", color: "#374151" }}>{q.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <footer style={{ marginTop: 24, fontSize: 13, color: "#6b7280" }}>
        Estimates only. Tax rules vary by situation; confirm with a tax professional.
      </footer>
    </main>
  );
}
