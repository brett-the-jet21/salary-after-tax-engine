import AdSlot from "./AdSlot";

export default function MoneyStrip() {
  return (
    <section style={{ marginTop: 18, padding: 16, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12 }}>
      <h3 style={{ margin: 0 }}>Want to keep more of your paycheck?</h3>
      <p style={{ marginTop: 8, marginBottom: 10, opacity: 0.9 }}>
        Try tax software, optimize withholding, and compare take-home across states.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <a href="/go/tax" style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.18)" }}>
          Compare tax filing options →
        </a>
        <a href="/go/savings" style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.18)" }}>
          High-yield savings picks →
        </a>
      </div>

      <AdSlot />

      <div style={{ marginTop: 12, opacity: 0.9 }}>
        <strong>Free:</strong> Get a salary negotiation cheat sheet (coming next).
      </div>
    </section>
  );
}
