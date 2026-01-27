export default function sitemap() {
  const base = "https://www.californiasalaryaftertax.com";
  const now = new Date();
  const routes = ["", "/california", "/salary", "/hourly"];

  for (let amt = 50000; amt <= 300000; amt += 5000) {
    routes.push(`/salary/${amt}-after-tax-california`);
  }

  const cities = [
    "los-angeles",
    "san-francisco",
    "san-diego",
    "san-jose",
    "orange-county"
  ];
  for (const c of cities) {
    routes.push(`/california/${c}`);
  }

  return routes.map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.7
  }));
}
