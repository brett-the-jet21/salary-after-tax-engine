import { redirect } from "next/navigation";

const MAP: Record<string, string> = {
  tax: "https://www.irs.gov/filing",
  savings: "https://www.consumerfinance.gov/consumer-tools/banking/",
};

export default function Go({ params }: { params: { slug: string } }) {
  redirect(MAP[params.slug] || "/");
}
