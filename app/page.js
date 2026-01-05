"use client";

import { useMemo, useState } from "react";
import { calculateCaliforniaTakeHome } from "./lib/californiaTax";

const PAY_PERIODS = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52
};

function fmtMoney(n) {
  return (Number(n) || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function Home() {
  // Input mode
  const [incomeType, setIncomeType] = useState("annual"); // "annual" | "hourly"

  // Annual input (string so typing replaces cleanly)
  const [annualSalary, setAnnualSalary] = useState("100000");

  // Hourly inputs (strings so typing replaces cleanly)
  const [hourlyWage, setHourlyWage] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  // Tax settings
  const [filingStatus, setFilingStatus] = useState("single"); // "single" | "married" | "hoh"

  // Output settings
  const [payPeriod, setPayPeriod] = useState("annual"); // "annual" | "monthly" | "biweekly" | "weekly"

  // Convert inputs -> annual salary for the engine
  const salary = useMemo(() => {
    if (incomeType === "hourly") {
      const h = Math.max(0, Number(hourlyWage || 0));
      const hpw = Math.max(0, Number(hoursPerWeek || 0));
      const wpy = Math.max(0, Number(weeksPerYear || 0));
      return h * hpw * wpy;
    }
    return Math.max(0, Number(annualSalary || 0));
  }, [incomeType, hourlyWage, hoursPerWeek, weeksPerYear, annualSalary]);

  const result = useMemo(() => {
    return calculateCaliforniaTakeHome({
      salary,
      filingStatus
    });
  }, [salary, filingStatus]);

  const divisor = PAY_PERIODS[payPeriod] || 1;

  return (
    <main style={{ maxWidth: 880, margin: "40px auto", padding: 16, fontFamily: "Arial" }}>
      <h1>California Salary After Tax Calculator</h1>

      <p>
        Estimate your <strong>California take-home pay</strong> using real federal and California tax
        brackets. Supports salary and hourly wages.
      </p>

      {/* Income type toggle */}
      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => setIncomeType("annual")}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: "pointer",
            background: incomeType === "annual" ? "#f2f2f2" : "white",
            fontWeight: incomeType === "annual" ? 700 : 400
          }}
        >
          Annual Salary
        </button>
        <button
          onClick={() => setIncomeType("hourly")}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: "pointer",
            background: incomeType === "hourly" ? "#f2f2f2" : "white",
            fontWeight: incomeType === "hourly" ? 700 : 400
          }}
        >
          Hourly Wage
        </button>
      </div>

      {/* Inputs */}
      {incomeType === "annual" ? (
        <label style={{ display: "block", marginTop: 16 }}>
          Annual Salary ($)
          <input
            type="text"
            inputMode="numeric"
            value={annualSalary}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d]/g, "");
              setAnnualSalary(v);
            }}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            placeholder="e.g. 75000"
          />
        </label>
      ) : (
        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          <label>
            Hourly Wage ($/hr)
            <input
              type="text"
              inputMode="decimal"
              value={hourlyWage}
              onChange={(e) => {
                // allow digits and ONE decimal point
                let v = e.target.value.replace(/[^\d.]/g, "");
                const parts = v.split(".");
                if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
                setHourlyWage(v);
              }}
              style={{ width: "100%", padding: 10, marginTop: 6 }}
              placeholder="e.g. 30 or 30.50"
            />
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label>
              Hours / Week
              <input
                type="text"
                inputMode="numeric"
                value={hoursPerWeek}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  setHoursPerWeek(v);
                }}
                style={{ width: "100%", padding: 10, marginTop: 6 }}
                placeholder="e.g. 40"
              />
            </label>

            <label>
              Weeks / Year
              <input
                type="text"
                inputMode="numeric"
                value={weeksPerYear}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  setWeeksPerYear(v);
                }}
                style={{ width: "100%", padding: 10, marginTop: 6 }}
                placeholder="e.g. 52"
              />
            </label>
          </div>

          <div style={{ fontSize: 13, color: "#666" }}>
            Annualized salary used for taxes: <strong>${fmtMoney(salary)}</strong>
          </div>
        </div>
      )}

      {/* Filing Status */}
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

      {/* Output Pay Period */}
      <label style={{ display: "block", marginTop: 16 }}>
        Show Take-Home As
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

      {/* Results */}
      <div style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
        <div style={{ fontSize: 14, color: "#666" }}>Take-Home Pay ({payPeriod})</div>
        <div style={{ fontSize: 34, fontWeight: 700 }}>
          ${fmtMoney(result.takeHome / divisor)}
        </div>
      </div>

      <h2 style={{ marginTop: 28 }}>Annual Tax Breakdown</h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Federal Tax: ${fmtMoney(result.federal)}</li>
        <li>California Tax: ${fmtMoney(result.state)}</li>
        <li>FICA: ${fmtMoney(result.fica)}</li>
        <li>CA SDI: ${fmtMoney(result.sdi)}</li>
      </ul>

      <p style={{ marginTop: 32, fontSize: 13, color: "#666" }}>
        Estimates based on tax brackets and standard deductions. Does not include itemized deductions,
        credits, or employer benefits.
      </p>
    </main>
  );
}
