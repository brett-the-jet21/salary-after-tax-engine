export const metadata = { title: "Federal vs State Income Tax", description: "How federal and California taxes combine to affect take-home pay." };
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Federal vs State Income Tax</h1>
      <div className="space-y-4 text-base leading-7">
        <p>Federal tax applies nationwide. California state tax depends on where you live and work.</p>
        <p className="text-sm opacity-80 mt-10"><strong>Last updated:</strong> 2026</p>
      </div>
    </main>
  );
}
