import Script from "next/script";
import Link from "next/link";
import { faqPageJsonLd, clampSalary, titleForSalary, descriptionForSalary, buildFaqs, money } from "@/lib/seo/faq";

// If you already have a calculator component/page, we’ll reuse it by embedding a link + CTA.
// Later, we can import and render the calculator directly here for perfect UX.

type PageProps = { params: { amount: string } };

// Next.js App Router metadata (dynamic)
export function generateMetadata({ params }: PageProps) {
  const salary = clampSalary(params.amount);
  const title = titleForSalary(salary);
  const description = descriptionForSalary(salary);

  const canonical = `https://www.californiasalaryaftertax.com/california/salary/${salary}-after-tax`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "California Salary After Tax",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

function InternalLinks({ salary }: { salary: number }) {
  const bumps = [5000, 10000, 25000, 50000]
    .map((b) => salary + b)
    .filter((v) => v <= 2_000_000);

  const downs = [5000, 10000, 25000, 50000]
    .map((b) => salary - b)
    .filter((v) => v >= 20_000);

  const mk = (v: number) => `/california/salary/${v}-after-tax`;

  return (
    <div style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700 }}>Explore nearby salaries</h2>
      <p style={{ opacity: 0.85, marginTop: 6 }}>
        People also compare take-home for similar salaries to understand raises, offers, and job switches.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 12 }}>
        <div style={{ border: "1px solid rgba(255,255,255,0.10)", borderRadius: 12, padding: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Higher</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
            {bumps.map((v) => (
              <li key={v}><Link href={mk(v)}>${money(v)} after tax</Link></li>
            ))}
          </ul>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.10)", borderRadius: 12, padding: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Lower</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
            {downs.map((v) => (
              <li key={v}><Link href={mk(v)}>${money(v)} after tax</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SalaryAfterTaxPage({ params }: PageProps) {
  const salary = clampSalary(params.amount);
  const faqs = buildFaqs(salary);
  const jsonLd = faqPageJsonLd(faqs);

  // Link into your main calculator (root) so users can actually calculate with full inputs
  // Later: we can import the calculator component directly here.
  const calcUrl = `/?salary=${salary}`;

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px" }}>
      {/* FAQPage JSON-LD */}
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}>
          ${money(salary)} Salary After Tax in California
        </h1>
        <p style={{ marginTop: 10, fontSize: 16, opacity: 0.9 }}>
          Estimate take-home pay for a <strong>${money(salary)}</strong> salary in California after federal tax, FICA, California income tax, and CA SDI.
          Adjust filing status and deductions in the full calculator.
        </p>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href={calcUrl}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              padding: "10px 14px",
              fontWeight: 800,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.14)"
            }}
          >
            Open full calculator →
          </a>

          <a
            href="/california"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              padding: "10px 14px",
              fontWeight: 700,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.10)",
              opacity: 0.95
            }}
          >
            California tax hub
          </a>
        </div>
      </header>

      <section style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginTop: 0 }}>How this calculator estimates your take-home</h2>
        <ul style={{ lineHeight: 1.7, paddingLeft: 18, margin: "10px 0 0 0", opacity: 0.95 }}>
          <li><strong>Federal income tax withholding</strong> (estimate)</li>
          <li><strong>FICA</strong> (Social Security + Medicare)</li>
          <li><strong>California state income tax</strong> (estimate)</li>
          <li><strong>CA SDI</strong> (when applicable)</li>
          <li><strong>Optional deductions</strong> like 401(k) / HSA can change results</li>
        </ul>
        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Payroll withholding is an estimate and can differ from your final tax return. Bonuses, commissions, and benefit elections can shift take-home.
        </p>
      </section>

      <InternalLinks salary={salary} />

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 900 }}>FAQ</h2>
        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          {faqs.map((f) => (
            <details key={f.q} style={{ border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 12 }}>
              <summary style={{ cursor: "pointer", fontWeight: 800 }}>{f.q}</summary>
              <div style={{ marginTop: 8, opacity: 0.9, lineHeight: 1.7 }}>{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: 32, opacity: 0.75, fontSize: 13 }}>
        <p>
          Tip: If you’re comparing offers, use the full calculator to include deductions (401k/HSA) and pay frequency.
        </p>
      </footer>
    </main>
  );
}
