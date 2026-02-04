import { redirect, notFound } from "next/navigation";

type Props = { params: { slug: string } };

// Handles legacy/garbage formatted URLs like:
// /salary/$50,000-after-tax-california
// /salary/50,000-after-tax-california
// /salary/50000-after-tax-california   (will still work)
export default function LegacySalaryRedirect({ params }: Props) {
  const slug = String(params?.slug || "").trim();

  // ✅ Guard: if it's already canonical, do NOT redirect to itself.
  // Canonical pages like /salary/305000-after-tax-california should be handled by
  // the real static/dynamic page route, not this legacy redirect route.
  if (/^\d+-after-tax-california$/.test(slug)) return notFound();



  const m = slug.match(/(\d[\d,]*)/);
  if (!m) return notFound();

  const amount = m[1].replace(/,/g, "");
  if (!amount) return notFound();

  redirect(`/salary/${amount}-after-tax-california`);
}
