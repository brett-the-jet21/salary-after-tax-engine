import Calculator from "../../../components/Calculator";
import RelatedHourly from "../../../components/RelatedHourly";

export const metadata = {
  title: "$30/Hour After Tax in California (2026 Paycheck Calculator)",
  description:
    "See your take-home pay after taxes if you make $30 an hour in California. Weekly, biweekly, monthly breakdown."
};

export default function Page() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
      <h1>$30 an Hour After Tax in California</h1>

      <p>
        Earning <strong>$30 per hour in California</strong> means your
        take-home pay will vary based on hours worked and tax withholdings.
      </p>

      <Calculator presetHourly="30" />

      

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "": "https://schema.org",
            "": "FAQPage",
            "mainEntity": [
              {
                "": "Question",
                "name": "How much is \ž39{RATE}/hour after tax in California?",
                "acceptedAnswer": {
                  "": "Answer",
                  "text": "Your take-home pay depends on hours worked and withholdings (federal tax, California state tax, FICA, and CA SDI). Use the calculator above for an estimate."
                }
              },
              {
                "": "Question",
                "name": "Does this include California SDI?",
                "acceptedAnswer": {
                  "": "Answer",
                  "text": "Yes, the estimate includes CA SDI where applicable."
                }
              }
            ]
          })
        }}
      />

      <RelatedHourly rate={30} />
<h2>Annual salary equivalent</h2>
      <p>
        At 40 hours per week, $30/hour equals approximately{" "}
        <strong>$62400</strong> per year before taxes.
      </p>

      <p style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Last updated: 2026
      </p>
    </main>
  );
}
