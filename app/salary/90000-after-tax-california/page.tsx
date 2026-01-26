import Calculator from "@/components/Calculator";

export const metadata = {
  title: "$90000 Salary After Tax in California (2026 Take-Home Pay)",
  description:
    "See your take-home pay after federal tax, California state tax, SDI, and FICA on a $90000 salary. Updated for 2026."
};

export default function Page() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
      <h1>$90000 Salary After Tax in California</h1>

      <p>
        If you earn <strong>$90000 per year in California</strong>, your
        take-home pay depends on federal taxes, California state income tax,
        Social Security, and Medicare.
      </p>

      <Calculator presetSalary="90000" />

      <h2>How taxes affect a $90000 salary in CA</h2>
      <p>
        California has progressive state income tax rates. Your employer also
        withholds federal income tax and payroll taxes automatically.
      </p>

      <h2>Is this calculator accurate?</h2>
      <p>
        Yes. This calculator uses current IRS and California tax brackets and
        includes CA SDI.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Last updated: 2026
      </p>
    </main>
  );
}
