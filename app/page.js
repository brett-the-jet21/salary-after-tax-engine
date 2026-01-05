"use client";

import { useState } from "react";
import { calculateCaliforniaTakeHome } from "./lib/californiaTax";

const PAY_PERIODS = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52
};

export default function Home() {
  const [salary, setSalary] = useState(100000);
  const [filingStatus, setFilingStatus] = useState("single");
  const [payPeriod, setPayPeriod] = useState("annual");

  const result = calculateCaliforniaTakeHome({
    salary,
    filingStatus
  });

  const divisor = PAY_PERIODS[payPeriod];

  return (
    <main style={{ maxWidth: 820, margin: "40px auto", padding: 16, fontFamily: "Arial" }}>
      <h1>California Salary After Tax Calculator</h1>

      <p>
        Calculate your <strong>California take-home pay</strong> using real
        federal and California tax brackets.
      </p>

      <label>
        Annual Salary ($)
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        />
      </label>

      <label style={{ display: "block", marginTop: 16 }}>
        Filing Status
        <select
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        >
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="hoh">Head of Household</option>
        </select>
      </label>

      <label style={{ display: "block", marginTop: 16 }}>
        Pay Period
        <select
          value={payPeriod}
          onChange={(e) => setPayPeriod(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        >
          <option value="annual">Annual</option>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="weekly">Weekly</option>
        </select>
      </label>

      <div style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
        <div style={{ fontSize: 14, color: "#666" }}>Take-Home Pay ({payPeriod})</div>
        <div style={{ fontSize: 34, fontWeight: 700 }}>
          ${(result.takeHome / divisor).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>

      <h2 style={{ marginTop: 28 }}>Annual Tax Breakdown</h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Federal Tax: ${result.federal.toLocaleString()}</li>
        <li>California Tax: ${result.state.toLocaleString()}</li>
        <li>FICA: ${result.fica.toLocaleString()}</li>
        <li>CA SDI: ${result.sdi.toLocaleString()}</li>
      </ul>

      <p style={{ marginTop: 32, fontSize: 13, color: "#666" }}>
        Estimates based on current tax brackets. Does not include itemized deductions or credits.
      </p>
    </main>
  );
}
