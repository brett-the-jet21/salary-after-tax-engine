export const metadata = { title: "California Tax Brackets (Overview)", description: "How California brackets work and how to interpret marginal rates." };
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">California Tax Brackets (Overview)</h1>
      <div className="space-y-4 text-base leading-7">
        <p>California uses progressive brackets. Your top rate applies only to the top portion of income.</p>
        <h2 className="text-2xl font-semibold mt-8">What to verify</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Filing status</li>
          <li>Taxable income vs gross income</li>
          <li>Deductions and credits</li>
        </ul>
        <p className="text-sm opacity-80 mt-10"><strong>Last updated:</strong> 2026</p>
      </div>
    </main>
  );
}
