"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculateTexasTakeHome } from "../lib/texasTax";

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

export default function TexasPage() {
  const [payType, setPayType] = useState("salary");
  const [salaryInput, setSalaryInput] = useState("100,000");
  const [hourlyInput, setHourlyInput] = useState("65");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [payPeriod, setPayPeriod] = useState("annual");
  const [filingStatus, setFilingStatus] = useState("single");

  const annualGross = useMemo(() => {
    if (payType === "hourly") {
      const hourly = Number(stripCommas(hourlyInput)) || 0;
      const hpw = Number(stripCommas(hoursPerWeek)) || 0;
      return hourly * hpw * 52;
    }
    return Number(stripCommas(salaryInput)) || 0;
  }, [payType, salaryInput, hourlyInput, hoursPerWeek]);

  const result = useMemo(() => {
    return calculateTexasTakeHome({ annualGross, filingStatus });
  }, [annualGross, filingStatus]);

  const periods = PAY_PERIODS[payPeriod] || 1;

  const grossPerPeriod = annualGross / periods;
  const netPerPeriod = (result.netAnnual || 0) / periods;
  const fedPerPeriod = (result.federalAnnual || 0) / periods;
  const ficaPerPeriod = (result.ficaAnnual || 0) / periods;

  return (
    <main>
      {/* TX-only wrapper to match “app-like” centered layout */}
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <header style={{ marginBottom: 16 }}>
          <strong>Salary After Tax Calculator</strong>
          <div style={{ marginTop: 4 }}>
            <Link href="/">California</Link> | <strong>Texas</strong>
          </div>
        </header>

        <h1>Texas Salary Calculator (After Tax)</h1>
        <p>
          Estimate your take-home pay in Texas after <b>federal taxes</b> and{" "}
          <b>FICA</b>. Texas has <b>no state income tax</b>.
        </p>

        <section>
          <label>Pay type</label>
          <button
            onClick={() => setPayType("salary")}
            aria-pressed={payType === "salary"}
          >
            Salary
          </button>{" "}
          <button
            onClick={() => setPayType("hourly")}
            aria-pressed={payType === "hourly"}
          >
            Hourly
          </button>

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

          {payType === "salary" ? (
            <>
              <label style={{ marginTop: 12 }}>Annual salary</label>
              <input
                value={salaryInput}
                onChange={(e) => setSalaryInput(formatWithCommas(e.target.value))}
                placeholder="100,000"
              />
            </>
          ) : (
            <>
              <label style={{ marginTop: 12 }}>Hourly rate</label>
              <input
                value={hourlyInput}
                onChange={(e) => setHourlyInput(formatWithCommas(e.target.value))}
              />

              <label style={{ marginTop: 12 }}>Hours per week</label>
              <input
                value={hoursPerWeek}
                onChange={(e) =>
                  setHoursPerWeek(formatWithCommas(e.target.value))
                }
              />
            </>
          )}

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
          <h2>Results ({payPeriod})</h2>
          <p>
            Gross: <b>${fmtMoney2(grossPerPeriod)}</b>
          </p>
          <p>
            Take-home: <b>${fmtMoney2(netPerPeriod)}</b>
          </p>
          <p>
            Effective tax rate:{" "}
            <b>{((result.effectiveTaxRate || 0) * 100).toFixed(1)}%</b>
          </p>
        </section>

        <section>
          <h2>Tax breakdown ({payPeriod})</h2>
          <p>Federal income tax: ${fmtMoney2(fedPerPeriod)}</p>
          <p>FICA (SS + Medicare): ${fmtMoney2(ficaPerPeriod)}</p>
          <p>Texas state income tax: $0.00</p>

          <p style={{ marginTop: 12, fontSize: 14 }}>
            <b>Footnote:</b> Estimates only. Results vary based on deductions,
            credits, and benefits. Texas has no state income tax, but federal
            and payroll taxes still apply.
          </p>
        </section>

        <section>
          <h2>How Texas taxes work</h2>
          <p>
            Texas does not levy a state income tax on wages. Your take-home pay
            is mainly reduced by federal income tax and payroll taxes (FICA).
          </p>
        </section>
      </div>
    </main>
  );
}
