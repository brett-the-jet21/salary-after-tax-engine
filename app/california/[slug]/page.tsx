import Link from "next/link";
import { notFound } from "next/navigation";
import { calculateCaliforniaTakeHome } from "../../lib/californiaTax";

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
  return {
    title: `$${salary.toLocaleString()} Salary After Tax in California (2026)`,
    description: `Estimate California take-home pay for $${salary.toLocaleString()} after federal tax, FICA, CA state tax, and CA SDI.`
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const salary = parseSalaryFromSlug(params.slug);
  if (!salary) return notFound();

  const r = calculateCaliforniaTakeHome({ salary, filingStatus: "single" });

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 34, marginBottom: 8 }}>
        ${salary.toLocaleString()} Salary After Tax in California (2026)
      </h1>
      <p style={{ marginTop: 0, opacity: 0.85 }}>
        Estimated take-home pay after federal tax, FICA, California state tax, and CA SDI.
      </p>

      <section style={{ padding: 16, border: "1px solid #e6e6e6", borderRadius: 12, marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Take-Home Pay (Annual)</h2>
        <div style={{ fontSize: 40, fontWeight: 700 }}>${money(r.takeHome)}</div>

        <h3 style={{ marginBottom: 8 }}>Tax Breakdown (Annual)</h3>
        <ul style={{ marginTop: 0 }}>
          <li>Federal Tax: ${money(r.federalTax)}</li>
          <li>California Tax: ${money(r.stateTax)}</li>
          <li>FICA: ${money(r.fica)}</li>
          <li>CA SDI: ${money(r.sdi)}</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Compare salaries</h2>
        <p style={{ marginTop: 0 }}>
          <Link href="/california/salary-comparison">Compare California salaries (every $5k) →</Link>
        </p>
        <p style={{ marginTop: 0 }}>
          <Link href="/">Use the calculator →</Link>
        </p>
      </section>
    </main>
  );
}
