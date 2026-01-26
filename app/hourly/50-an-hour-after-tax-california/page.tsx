import Calculator from "@/components/Calculator";

export const metadata = {
  title: "$50/Hour After Tax in California (2026 Paycheck Calculator)",
  description:
    "See your take-home pay after taxes if you make $50 an hour in California. Weekly, biweekly, monthly breakdown."
};

export default function Page() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
      <h1>$50 an Hour After Tax in California</h1>

      <p>
        Earning <strong>$50 per hour in California</strong> means your
        take-home pay will vary based on hours worked and tax withholdings.
      </p>

      <Calculator presetHourly="50" />

      <h2>Annual salary equivalent</h2>
      <p>
        At 40 hours per week, $50/hour equals approximately{" "}
        <strong>$104000</strong> per year before taxes.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Last updated: 2026
      </p>
    </main>
  );
}
