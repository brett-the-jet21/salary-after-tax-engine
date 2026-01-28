import SalaryPage from "../../[slug]/page";

function titleCaseCity(city: string) {
  return city
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseSalaryFromSlug(slug: string): number | null {
  const m = /^(\d+)-salary-after-tax$/.exec(slug);
  if (!m) return null;
  const salary = Number(m[1]);
  if (!Number.isFinite(salary) || salary <= 0) return null;
  return salary;
}

export async function generateMetadata({
  params
}: {
  params: { city: string; slug: string };
}) {
  const salary = parseSalaryFromSlug(params.slug);
  const cityName = titleCaseCity(params.city);

  if (!salary) {
    return { title: `California Salary After Tax in ${cityName}` };
  }

  return {
    title: `$${salary.toLocaleString()} Salary After Tax in ${cityName}, CA (2026)`,
    description: `Estimate take-home pay for $${salary.toLocaleString()} in ${cityName}, California after federal tax, FICA, CA state income tax, and CA SDI.`
  };
}

export default function CitySalaryPage({
  params
}: {
  params: { city: string; slug: string };
}) {
  // Reuse the canonical salary page UI + math
  return <SalaryPage params={{ slug: params.slug }} />;
}
