export default function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much tax do you pay in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "California taxes include federal income tax, FICA payroll taxes, California state income tax, and CA SDI. The exact amount depends on income, filing status, and deductions."
        }
      },
      {
        "@type": "Question",
        "name": "Why is California take-home pay lower than expected?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many paychecks are reduced by progressive state tax brackets, payroll taxes, and benefit deductions. Bonuses may also be withheld at higher supplemental rates."
        }
      },
      {
        "@type": "Question",
        "name": "Is this California salary calculator accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This calculator provides estimates using current tax rules and standard assumptions. Actual take-home pay can vary based on benefits, withholding, and individual circumstances."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
