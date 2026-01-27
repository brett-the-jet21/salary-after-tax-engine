import Calculator from "../../../components/Calculator";
import { calculateCaliforniaTakeHome } from "../../lib/californiaTax";
import RelatedSalaries from "../../../components/RelatedSalaries";

export const metadata = {
  title: "$165000 Salary After Tax in California (2026 Take-Home Pay)",
  description:
    "Calculate your take-home pay in California if you earn $165000 per year. Includes federal tax, CA state tax, FICA, and SDI. Updated for 2026."
};

export default function Page() {
  // TAX_ENGINE_FIX_ZERO_FIELDS
  const periods = { annual: 1, monthly: 12, biweekly: 26, weekly: 52 };
  const payPeriod: keyof typeof periods = "annual";
  const div = periods[payPeriod] || 1;
  const annualIncome = 165000;
  const out = calculateCaliforniaTakeHome({ annualIncome, filingStatus: "single" });

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
      <h1>$165000 Salary After Tax in California</h1>

      <p>
        If your annual salary is <strong>$165000</strong> in California, your
        actual take-home pay depends on federal income tax, California state tax,
        Social Security, Medicare, and SDI.
      </p>

      <Calculator presetSalary="165000" />

      

      <RelatedSalaries salary={165000} />
<h2>California tax breakdown</h2>
      <p>
        California uses progressive income tax brackets. Higher portions of your
        income are taxed at higher rates, while payroll taxes are withheld
        automatically.
      </p>

      <h2>Frequently asked questions</h2>
      <p>
        <strong>Does this include CA SDI?</strong> Yes.
      </p>
      <p>
        <strong>Is this calculator accurate?</strong> This calculator uses
        current tax rates and is updated for 2026.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Last updated: 2026
      </p>
    </main>
  );
}
