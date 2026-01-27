export type FAQ = { q: string; a: string };

export function faqPageJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

export function money(n: number) {
  const v = Number(n) || 0;
  return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function clampSalary(raw: string) {
  // Accept 20000 .. 2000000
  const n = Number(String(raw).replace(/[^\d]/g, ""));
  if (!Number.isFinite(n)) return 0;
  return Math.min(2_000_000, Math.max(20_000, Math.round(n)));
}

export function titleForSalary(salary: number) {
  const s = money(salary);
  return `$${s} Salary After Tax in California (2026) – Take-Home Pay Calculator`;
}

export function descriptionForSalary(salary: number) {
  const s = money(salary);
  return `Calculate take-home pay for a $${s} salary in California after federal tax, FICA, CA state income tax, and CA SDI. Includes paycheck breakdown and common deductions.`;
}

export function buildFaqs(salary: number) {
  const s = money(salary);

  return [
    {
      q: `How much is $${s} after tax in California?`,
      a:
        `Your take-home depends on filing status, pre-tax deductions (401(k), HSA), and pay frequency. This calculator estimates federal withholding, FICA, California income tax, and CA SDI to produce an after-tax take-home estimate for $${s}.`
    },
    {
      q: "Why does my paycheck differ from the calculator?",
      a:
        "Payroll withholding is an estimate, not your final tax bill. Differences come from bonuses/supplemental wages, benefit deductions, multiple jobs, updated W-4 choices, and timing across the year. Use the deductions inputs to match your situation more closely."
    },
    {
      q: "Does this include California SDI?",
      a:
        "Yes. California SDI is included as part of payroll-style deductions when applicable. The exact amount can vary by year and wage base limits."
    },
    {
      q: "Does this include local/city taxes in California?",
      a:
        "California generally does not levy a city wage tax like some states. Your results focus on federal + California income tax and payroll-style items (FICA/SDI)."
    },
    {
      q: "How do 401(k) and HSA affect take-home pay?",
      a:
        "Most 401(k) contributions reduce federal and state taxable income (Roth 401(k) does not). HSA contributions typically reduce taxable income when made pre-tax through payroll. Both can materially change take-home pay."
    }
  ];
}
