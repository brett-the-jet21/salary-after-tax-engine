import Link from "next/link";
import { notFound } from "next/navigation";
import { calculateCaliforniaTakeHome } from "../../lib/californiaTax";
import SalaryJump from "./SalaryJump.client";

export const revalidate = 86400;

function money(n: number) {
  return (Number(n) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function parseSalaryFromSlug(slug: string): number | null {
  const m = /^(\d+)-salary-after-tax$/.exec(slug);
  if (!m) return null;
  const salary = Number(m[1]);
  if (!Number.isFinite(salary) || salary <= 0) return null;
  return salary;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const salary = parseSalaryFromSlug(params.slug);
  if (!salary) return { title: "California Salary After Tax" };

  const title = `$${salary.toLocaleString()} Salary After Tax in California (2026)`;
  const description =
    `See estimated take-home pay for $${salary.toLocaleString()} in California after federal tax, FICA, CA state tax, and CA SDI.`;

  return { title, description };
}

export default function Page({ params }: { params: { slug: string } }) {
  const salary = parseSalaryFromSlug(params.slug);
  if (!salary) return notFound();

  const r = calculateCaliforniaTakeHome({ salary, filingStatus: "single" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much tax do you pay on a $${salary.toLocaleString()} salary in California?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Estimated total taxes are $${money(salary - r.takeHome)} on a $${salary.toLocaleString()} salary in California, leaving an annual take-home pay of $${money(r.takeHome)}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the monthly take-home pay for a $${salary.toLocaleString()} salary in California?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The estimated monthly take-home pay is $${money(r.takeHome / 12)}.`
        }
      },
      {
        "@type": "Question",
        "name": `Is $${salary.toLocaleString()} a good salary in California?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A $${salary.toLocaleString()} salary is considered a high income in many parts of California, though cost of living varies by city.`
        }
      }
    ]
  };

  const effectiveRate = salary > 0 ? ((salary - r.takeHome) / salary) * 100 : 0;

  return (
    <main style={{ minHeight: "100vh", background: "#fafafa" }}>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
<div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px 56px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>
              California Salary After Tax
            </div>

            <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: 0 }}>
              ${salary.toLocaleString()} Salary After Tax in California <span style={{ opacity: 0.65 }}>(2026)</span>
            </h1>

            <p style={{ marginTop: 10, marginBottom: 0, fontSize: 16, opacity: 0.85 }}>
              Estimated take-home pay after <b>federal tax</b>, <b>FICA</b>, <b>California state tax</b>, and <b>CA SDI</b>.
            </p>
          </div>

          <div style={{ alignSelf: "center" }}>
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #d7d7d7",
                background: "#fff",
                fontWeight: 800,
                textDecoration: "none",
                color: "#111"
              }}
            >
              Open full calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <SalaryJump initialSalary={salary} />
        </div>

        <section style={{ marginTop: 14 }}>
          <div style={{ fontSize: 14, opacity: 0.7, fontWeight: 800, marginBottom: 8 }}>
            Popular cities for this salary
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              ["san-francisco", "San Francisco"],
              ["los-angeles", "Los Angeles"],
              ["san-diego", "San Diego"],
              ["san-jose", "San Jose"],
              ["orange-county", "Orange County"]
            ].map(([citySlug, cityName]) => (
              <Link
                key={String(citySlug)}
                href={`/california/in/${citySlug}/${salary}-salary-after-tax`}
                style={{
                  padding: "8px 10px",
                  borderRadius: 999,
                  border: "1px solid #e6e6e6",
                  background: "#fff",
                  textDecoration: "none",
                  color: "#111",
                  fontWeight: 800
                }}
              >
                {cityName} →
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 18,
            background: "#fff",
            border: "1px solid #e6e6e6",
            borderRadius: 16,
            boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
            padding: 18
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, opacity: 0.7, fontWeight: 700 }}>Take-home pay (annual)</div>
              <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -0.5, marginTop: 6 }}>
                ${money(r.takeHome)}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <div style={{ padding: "8px 10px", borderRadius: 999, background: "#f3f3f3", fontWeight: 800 }}>
                  Effective tax rate: {effectiveRate.toFixed(1)}%
                </div>
                <div style={{ padding: "8px 10px", borderRadius: 999, background: "#f3f3f3", fontWeight: 800 }}>
                  Monthly take-home: ${money(r.takeHome / 12)}
                </div>
                <div style={{ padding: "8px 10px", borderRadius: 999, background: "#f3f3f3", fontWeight: 800 }}>
                  Biweekly take-home: ${money(r.takeHome / 26)}
                </div>
              </div>
            </div>

            <div style={{ borderLeft: "1px solid #eee", paddingLeft: 16 }}>
              <div style={{ fontSize: 14, opacity: 0.7, fontWeight: 700 }}>Tax breakdown (annual)</div>

              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                {[
                  ["Federal tax", r.federalTax],
                  ["California tax", r.stateTax],
                  ["FICA", r.fica],
                  ["CA SDI", r.sdi],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 12px",
                      border: "1px solid #eee",
                      borderRadius: 12,
                      background: "#fff"
                    }}
                  >
                    <div style={{ fontWeight: 800 }}>{label}</div>
                    <div style={{ fontWeight: 900 }}>${money(Number(value))}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
                Assumes filing status: <b>Single</b>. For other filing statuses, use the full calculator.
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 18, display: "grid", gap: 10 }}>
          <div style={{ fontSize: 22, fontWeight: 900 }}>Compare salaries</div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/california/salary-comparison"
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #d7d7d7",
                background: "#fff",
                fontWeight: 800,
                textDecoration: "none",
                color: "#111"
              }}
            >
              Compare (every $5k) →
            </Link>

            <Link
              href="/salary"
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #d7d7d7",
                background: "#fff",
                fontWeight: 800,
                textDecoration: "none",
                color: "#111"
              }}
            >
              Browse salary pages →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
