export const metadata = {
  title: "Methodology: How We Calculate After-Tax Salary",
  description: "How the calculator estimates after-tax pay using federal/CA brackets and payroll taxes."
};
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Methodology</h1>
      <div className="space-y-4 text-base leading-7">
        <p>This calculator estimates take-home pay using marginal federal and California tax brackets plus payroll taxes.</p>
        <h2 className="text-2xl font-semibold mt-8">Included</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Federal income tax (marginal brackets)</li>
          <li>California income tax (marginal brackets)</li>
          <li>Payroll taxes (Social Security + Medicare)</li>
        </ul>
        <p className="text-sm opacity-80 mt-10"><strong>Last updated:</strong> 2026</p>
      </div>
    </main>
  );
}
