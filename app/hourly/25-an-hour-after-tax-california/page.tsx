import Calculator from "../../../components/Calculator";

export const metadata = {
  title: "$25/Hour After Tax in California (2026 Paycheck Calculator)",
  description:
    "Estimate your take-home pay after federal tax, California state tax, FICA, and CA SDI if you make $25/hour in California. Updated for 2026."
};

export default function Page() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
      <h1>$25 an Hour After Tax in California</h1>

      <p>
        Use the calculator below to estimate take-home pay after federal taxes,
        California state tax, FICA, and CA SDI.
      </p>

      <Calculator presetHourly="25" />

      <h2>Notes</h2>
      <p>
        Results vary based on hours worked, pay frequency, and withholding.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Last updated: 2026
      </p>
    </main>
  );
}
