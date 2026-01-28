import { redirect, notFound } from "next/navigation";

type Props = { params: { slug: string } };

// This only handles salary-looking slugs like:
// /california/170000-salary-after-tax
// /california/$170,000-salary-after-tax
// It will NOT affect existing static pages like /california/los-angeles or
// /california/175000-salary-after-tax (those take precedence over [slug]).
export default function CaliforniaSlugRouter({ params }: Props) {
  const slug = String(params?.slug || "").trim();

  // Only act on the salary pattern to avoid hijacking city/other pages
  if (!slug.includes("salary-after-tax")) return notFound();

  // Pull the first number chunk, allowing commas
  const m = slug.match(/(\d[\d,]*)/);
  if (!m) return notFound();

  const amount = m[1].replace(/,/g, "");
  if (!amount) return notFound();

  // Canonical salary page that actually exists
  redirect(`/salary/${amount}-after-tax-california`);
}
