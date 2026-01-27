export default function sitemap() {
  const base = "https://www.californiasalaryaftertax.com";
  const now = new Date();

  const routes = ["", "/california", "/salary", "/hourly"];

  // Programmatic salary pages: 50k–300k in 5k steps
  for (let amt = 50000; amt <= 300000; amt += 5000) {
    routes.push(`/salary/${amt}-after-tax-california`);
  }

  // Popular hourly pages (if they exist)
  for (const h of [20, 25, 30, 35, 40, 50]) {
    routes.push(`/hourly/${h}-an-hour-after-tax-california`);
  }

  return routes.map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.7
  }));
}
