export const metadata = { title: "How California Income Tax Works", description: "Federal + CA + FICA basics, marginal vs effective rate." };
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">How California Income Tax Works</h1>
      <div className="space-y-4 text-base leading-7">
        <p>Your take-home pay includes federal income tax, California income tax, and payroll taxes (FICA).</p>
        <h2 className="text-2xl font-semibold mt-8">Federal income tax</h2>
        <p>Federal tax uses marginal brackets. Only the portion in each bracket is taxed at that rate.</p>
        <h2 className="text-2xl font-semibold mt-8">California income tax</h2>
        <p>California is progressive too; higher earners pay higher marginal rates on the top slice.</p>
        <h2 className="text-2xl font-semibold mt-8">Payroll taxes (FICA)</h2>
        <p>FICA includes Social Security and Medicare and is separate from income tax.</p>
        <p className="text-sm opacity-80 mt-10"><strong>Last updated:</strong> 2026</p>
      </div>
    </main>
  );
}
