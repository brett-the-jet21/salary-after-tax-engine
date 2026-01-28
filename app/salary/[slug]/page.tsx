import { redirect, notFound } from "next/navigation";

type Props = { params: { slug: string } };

// Handles legacy/garbage formatted URLs like:
// /salary/$50,000-after-tax-california
// /salary/50,000-after-tax-california
// /salary/50000-after-tax-california   (will still work)
export default function LegacySalaryRedirect({ params }: Props) {
  const slug = String(params?.slug || "").trim();

  const m = slug.match(/(\d[\d,]*)/);
  if (!m) return notFound();

  const amount = m[1].replace(/,/g, "");
  if (!amount) return notFound();

  redirect(`/salary/${amount}-after-tax-california`);
}
