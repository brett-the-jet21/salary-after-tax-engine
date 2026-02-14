import Link from "next/link";

export const metadata = {
  title: "State Salary After Tax Comparisons",
  description:
    "Compare take-home pay after taxes between states. Popular comparisons: California vs Texas, Florida, Washington.",
};

export default function CompareIndex() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 34, marginBottom: 10 }}>
        Salary After Tax: State Comparisons
      </h1>
      <p style={{ marginTop: 0, lineHeight: 1.6 }}>
        Compare how state taxes impact take-home pay. Start with the most
        searched matchups:
      </p>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <Link href="/compare/california-vs-texas-salary-after-tax">
            California vs Texas
          </Link>
        </li>
        <li>
          <Link href="/compare/california-vs-florida-salary-after-tax">
            California vs Florida
          </Link>
        </li>
        <li>
          <Link href="/compare/california-vs-washington-salary-after-tax">
            California vs Washington
          </Link>
        </li>
      </ul>
      <p>
        <Link href="/salary">Go to the main calculator →</Link>
      </p>
    </main>
  );
}
