export default function NotFound() {
  return (
    <main style={{maxWidth: 980, margin: "0 auto", padding: "28px 16px", fontFamily: "system-ui"}}>
      <h1 style={{fontSize: 32, marginBottom: 8}}>Page not found</h1>
      <p style={{fontSize: 16, lineHeight: 1.6, marginBottom: 18}}>
        This URL doesn’t exist on CaliforniaSalaryAfterTax.com. If you came from a saved link or Google, the page may have moved.
      </p>

      <section style={{background:"#fafafa", border:"1px solid #eee", borderRadius: 12, padding: 16, marginBottom: 18}}>
        <h2 style={{fontSize: 18, margin: "0 0 8px"}}>Try these instead</h2>
        <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.8}}>
          <li><a href="/salary">California salary after tax calculator</a></li>
          <li><a href="/hourly">California hourly after tax calculator</a></li>
          <li><a href="/california">California city pages</a></li>
          <li><a href="/california/salary-comparison">Salary comparison</a></li>
        </ul>
      </section>

      <p style={{fontSize: 14, color:"#555"}}>
        Tip: If you’re looking for a specific salary, use the calculator on the /salary page and we’ll generate a clean result page.
      </p>
    </main>
  );
}
