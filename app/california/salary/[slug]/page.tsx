import { redirect, notFound } from "next/navigation";

type Props = { params: { slug: string } };

export default function LegacyCaliforniaSalaryRedirect({ params }: Props) {
  const slug = String(params?.slug || "").trim();
  const m = slug.match(/(\d{1,9})/);
  if (!m) return notFound();
  const amount = m[1];
  redirect(`/california/${amount}-salary-after-tax`);
}
