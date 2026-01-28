import { redirect, notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default function LegacyCaliforniaSalaryRedirect({ params }: Props) {
  const slug = String(params?.slug || "").trim();

  // Grab first number chunk, allowing commas: "50,000"
  const m = slug.match(/(\d[\d,]*)/);
  if (!m) return notFound();

  const amount = m[1].replace(/,/g, "");
  if (!amount) return notFound();

  redirect(`/california/${amount}-salary-after-tax`);
}
