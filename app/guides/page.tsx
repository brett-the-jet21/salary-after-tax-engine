export const metadata = { title: "Guides", description: "California tax and take-home pay guides." };
export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Guides</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li><a className="underline" href="/guides/how-california-income-tax-works">How California income tax works</a></li>
        <li><a className="underline" href="/guides/california-tax-brackets-2026">California tax brackets (overview)</a></li>
        <li><a className="underline" href="/guides/federal-vs-state-income-tax">Federal vs state income tax</a></li>
        <li><a className="underline" href="/methodology">Methodology</a></li>
      </ul>
    </main>
  );
}
