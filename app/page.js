"use client";

import { useState } from "react";
import { calculateCaliforniaTakeHome } from "./lib/californiaTax";

export default function Home() {
  const [salary, setSalary] = useState(100000);
  const result = calculateCaliforniaTakeHome(Number(salary || 0));

  return (
    <main style={{ maxWidth: 820, margin: "40px auto", padding: 16, fontFamily: "Arial" }}>
      <h1>California Salary After Tax Calculator</h1>

      <p>
        Estimate your <strong>salary after tax in California</strong>, including
        federal tax, FICA, California state income tax, and California SDI.
      </p>

      <label style={{ display: "block", marginTop: 18 }}>
        Annual Salary ($)
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 8, fontSize: 16 }}
          min="0"
        />
      </label>

      <div style={{ marginTop: 22, padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
        <div style={{ fontSize: 14, color: "#666" }}>Estimated Take-Home (Annual)</div>
        <div style={{ fontSize: 34, fontWeight: 700 }}>
          ${result.takeHome.toLocaleString()}
        </div>
      </div>

      <h2 style={{ marginTop: 26 }}>Estimated Breakdown</h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Federal tax (estimate): ${result.federal.toLocaleString()}</li>
        <li>FICA (SS + Medicare): ${result.fica.toLocaleString()}</li>
        <li>California state tax (estimate): ${result.state.toLocaleString()}</li>
        <li>CA SDI: ${result.sdi.toLocaleString()}</li>
      </ul>

      <p style={{ marginTop: 34, fontSize: 13, color: "#666" }}>
        Note: This is an estimate. Filing status, deductions, and real brackets
        will be added next.
      </p>
    </main>
  );
}
