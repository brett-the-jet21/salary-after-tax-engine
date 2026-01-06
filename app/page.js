"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculateCaliforniaTakeHome } from "./lib/californiaTax";

const PAY_PERIODS = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52
};

function fmtMoney2(n) {
  return (Number(n) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatWithCommas(value) {
  if (value === undefined || value === null) return "";
  const raw = String(value).replace(/,/g, "");
  if (raw === "") return "";
  const parts = raw.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function stripCommas(value) {
  return String(value || "").replace(/,/g, "");
}

export default function CaliforniaPage() {
  const [salaryInput, setSalaryInput] = useState("100,000");
  const [payPeriod, setPayPeriod] = useState("annual");
  const [filingStatus, setFilingStatus] = useState("single");

  const annualGross = Number(stripCommas(salaryInput)) || 0;

  const result = useMemo(() => {
    return calculateCaliforniaTakeHome({
      annualGross,
      filingStatus
    });
  }, [annualGross, filingStatus]);

  const periods = PAY_PERIODS[payPeriod] || 1;

  return (
    <main>
      <header>
        <strong>Salary After Tax Calculator</strong>
        <div style={{ marginTop: 4 }}>
          <strong>California</strong> | <Link href="/texas">Texas</Link>
        </div>
      </header>

      <h1>California Salary Calculator (After Tax)</h1>

      <section>
        <label>Annual salary</label>
        <input
          value={salaryInput}
          onChange={(e) => setSalaryInput(formatWithCommas(e.target.value))}
        />

        <label style={{ marginTop: 12 }}>Filing status</label>
        <select
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value)}
        >
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="mfs">Married Filing Separately</option>
          <option value="hoh">Head of Household</option>
          <option value="qss">Qualifying Surviving Spouse</option>
        </select>

        <label style={{ marginTop: 12 }}>Pay period</label>
        <select
          value={payPeriod}
          onChange={(e) => setPayPeriod(e.target.value)}
        >
          <option value="annual">Annual</option>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="weekly">Weekly</option>
        </select>
      </section>

      <section>
        <h2>Results</h2>
        <p>Take-home: <b>${fmtMoney2(result.netAnnual / periods)}</b></p>
      </section>
    </main>
  );
}
