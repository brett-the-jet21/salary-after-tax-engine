import Link from "next/link";

const STATE_LABEL: Record<string, string> = {
  alabama: "Alabama",
  alaska: "Alaska",
  arizona: "Arizona",
  arkansas: "Arkansas",
  california: "California",
  colorado: "Colorado",
  connecticut: "Connecticut",
  delaware: "Delaware",
  florida: "Florida",
  georgia: "Georgia",
  hawaii: "Hawaii",
  idaho: "Idaho",
  illinois: "Illinois",
  indiana: "Indiana",
  iowa: "Iowa",
  kansas: "Kansas",
  kentucky: "Kentucky",
  louisiana: "Louisiana",
  maine: "Maine",
  maryland: "Maryland",
  massachusetts: "Massachusetts",
  michigan: "Michigan",
  minnesota: "Minnesota",
  mississippi: "Mississippi",
  missouri: "Missouri",
  montana: "Montana",
  nebraska: "Nebraska",
  nevada: "Nevada",
  "new-hampshire": "New Hampshire",
  "new-jersey": "New Jersey",
  "new-mexico": "New Mexico",
  "new-york": "New York",
  "north-carolina": "North Carolina",
  "north-dakota": "North Dakota",
  ohio: "Ohio",
  oklahoma: "Oklahoma",
  oregon: "Oregon",
  pennsylvania: "Pennsylvania",
  "rhode-island": "Rhode Island",
  "south-carolina": "South Carolina",
  "south-dakota": "South Dakota",
  tennessee: "Tennessee",
  texas: "Texas",
  utah: "Utah",
  vermont: "Vermont",
  virginia: "Virginia",
  washington: "Washington",
  "west-virginia": "West Virginia",
  wisconsin: "Wisconsin",
  wyoming: "Wyoming",
};

function titleCaseFromSlug(s: string) {
  return (STATE_LABEL[s] ?? s)
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// expected: "<stateA>-vs-<stateB>-salary-after-tax"
function parseCompareSlug(slug: string) {
  const cleaned = slug.replace(/-salary-after-tax$/, "");
  const parts = cleaned.split("-vs-");
  if (parts.length !== 2) return null;
  const [a, b] = parts;
  if (!a || !b) return null;
  return { a, b };
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const parsed = parseCompareSlug(params.slug);
  const fallbackTitle = "Salary After Tax Comparison";
  if (!parsed) {
    return {
      title: fallbackTitle,
      description:
        "Compare take-home pay after taxes between two states. Enter your salary and see the difference.",
    };
  }

  const A = titleCaseFromSlug(parsed.a);
  const B = titleCaseFromSlug(parsed.b);

  return {
    title: `${A} vs ${B} Salary After Tax (Take-Home Pay Comparison)`,
    description: `Compare take-home pay after taxes between ${A} and ${B}. See how state income tax can change your net pay.`,
    alternates: { canonical: `/compare/${params.slug}` },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const parsed = parseCompareSlug(params.slug);

  if (!parsed) {
    return (
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px" }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Salary After Tax Comparison
        </h1>
        <p style={{ marginTop: 0, lineHeight: 1.5 }}>
          This comparison URL format is invalid. Try a format like{" "}
          <code>california-vs-texas-salary-after-tax</code>.
        </p>
        <p>
          <Link href="/salary">Go to the Salary Calculator</Link>
        </p>
      </main>
    );
  }

  const A = titleCaseFromSlug(parsed.a);
  const B = titleCaseFromSlug(parsed.b);

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 34, marginBottom: 10 }}>
        {A} vs {B} Salary After Tax
      </h1>

      <p style={{ marginTop: 0, lineHeight: 1.6 }}>
        This page compares <b>take-home pay</b> between <b>{A}</b> and{" "}
        <b>{B}</b> for the same gross salary. Differences are usually driven by
        state income tax rules, payroll taxes, and deductions.
      </p>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 12,
          padding: 16,
          margin: "18px 0",
        }}
      >
        <h2 style={{ fontSize: 18, margin: "0 0 10px 0" }}>Do this next</h2>
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
          <li>
            Use the calculator to get a baseline take-home number for your
            salary.
          </li>
          <li>
            Check the difference between states (especially if one has no state
            income tax).
          </li>
          <li>
            If you’re relocating, also consider local taxes, cost of living, and
            benefits.
          </li>
        </ol>
        <p style={{ margin: "12px 0 0 0" }}>
          <Link href="/salary">Open the Salary After-Tax Calculator →</Link>
        </p>
      </div>

      <h2 style={{ fontSize: 20, marginTop: 26 }}>
        Popular comparisons (we’re building these out)
      </h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>
          <Link href="/compare/california-vs-texas-salary-after-tax">
            California vs Texas salary after tax
          </Link>
        </li>
        <li>
          <Link href="/compare/california-vs-florida-salary-after-tax">
            California vs Florida salary after tax
          </Link>
        </li>
        <li>
          <Link href="/compare/california-vs-washington-salary-after-tax">
            California vs Washington salary after tax
          </Link>
        </li>
      </ul>

      <p style={{ marginTop: 22, opacity: 0.85 }}>
        Note: This compare section is live to avoid 404s and preserve SEO while
        we roll out full multi-state calculations.
      </p>
    </main>
  );
}
