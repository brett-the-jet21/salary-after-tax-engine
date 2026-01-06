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

// Light “CA-like” card UI without Tailwind (works with your globals.css)
const styles = {
  container: { maxWidth: 980, margin: "0 auto", padding: "32px 20px" },
  topbar: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 },
  brand: { fontSize: 16, fontWeight: 700 },
  navRow: { display: "flex", gap: 12, alignItems: "center", fontSize: 14 },
  h1: { fontSize: 44, lineHeight: 1.1, margin: "10px 0 10px", fontWeight: 800 },
  sub: { fontSize: 18, color: "#334155", marginBottom: 24 },

  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 22,
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
  },

  sectionTitle: { fontSize: 22, fontWeight: 800, margin: "0 0 14px" },

  pills: {
    display: "inline-flex",
    border: "1px solid #e5e7eb",
    borderRadius: 999,
    padding: 4,
    gap: 4,
    background: "#fff"
  },
  pillBtn: (active) => ({
    border: "none",
    borderRadius: 999,
    padding: "10px 16px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    background: active ? "#0f172a" : "transparent",
    color: active ? "#fff" : "#0f172a"
  }),

  label: { fontSize: 22, fontWeight: 800, marginTop: 18, marginBottom: 10 },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #d1d5db",
    fontSize: 20,
    outline: "none"
  },
  select: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #d1d5db",
    fontSize: 18,
    outline: "none",
    background: "#fff"
  },
  helper: { marginTop: 10, fontSize: 14, color: "#6b7280", fontWeight: 600 },

  spacer: { height: 18 },

  takeHomeCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 22,
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    marginTop: 22
  },
  takeHomeLabel: { fontSize: 22, color: "#0f172a", marginBottom: 8 },
  takeHomeValue: { fontSize: 56, fontWeight: 900, letterSpacing: "-0.02em" },

  breakdownTitle: { fontSize: 40, fontWeight: 900, marginTop: 26, marginBottom: 10 },
  ul: { marginTop: 8, paddingLeft: 22, color: "#0f172a", fontSize: 20, lineHeight: 1.7 }
};

export default function TexasPage() {
  const [mode, setMode] = useState("salary"); // salary | hourly
  const [salaryInput, setSalaryInput] = useState("100,000");
  const [hourlyInput, setHourlyInput] = useState("50");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [filingStatus, setFilingStatus] = useState("single");
  const [payPeriod, setPayPeriod] = useState("annual");

  const annualGross = useMemo(() => {
    if (mode === "hourly") {
      const hourly = Number(stripCommas(hourlyInput)) || 0;
      const hpw = Number(stripCommas(hoursPerWeek)) || 0;
      return hourly * hpw * 52;
    }
    return Number(stripCommas(salaryInput)) || 0;
  }, [mode, salaryInput, hourlyInput, hoursPerWeek]);

  const result = useMemo(() => {
    return calculateTexasTakeHome({ annualGross, filingStatus });
  }, [annualGross, filingStatus]);

  const periods = PAY_PERIODS[payPeriod] || 1;

  const takeHomePerPeriod = (result.netAnnual || 0) / periods;
  const fedPerPeriod = (result.federalAnnual || 0) / periods;
  const ficaPerPeriod = (result.ficaAnnual || 0) / periods;

  const periodLabel =
    payPeriod === "annual"
      ? "Annual"
      : payPeriod === "monthly"
      ? "Monthly"
      : payPeriod === "biweekly"
      ? "Bi-weekly"
      : "Weekly";

  return (
    <main>
      <div style={styles.container}>
        <div style={styles.topbar}>
          <div style={styles.brand}>Salary After Tax Calculator</div>
          <div style={styles.navRow}>
            <Link href="/" style={{ fontWeight: 700 }}>
              California
            </Link>
            <span style={{ color: "#94a3b8" }}>|</span>
            <span style={{ fontWeight: 900 }}>Texas</span>
          </div>
        </div>

        <h1 style={styles.h1}>Texas Salary After Tax Calculator</h1>
        <p style={styles.sub}>
          Estimate your <b>Texas take-home pay</b> after federal taxes and payroll taxes (FICA). Texas has{" "}
          <b>no state income tax</b>.
        </p>

        <div style={styles.card}>
          <div style={styles.pills}>
            <button
              type="button"
              style={styles.pillBtn(mode === "salary")}
              onClick={() => setMode("salary")}
            >
              Annual Salary
            </button>
            <button
              type="button"
              style={styles.pillBtn(mode === "hourly")}
              onClick={() => setMode("hourly")}
            >
              Hourly Wage
            </button>
          </div>

          {mode === "salary" ? (
            <>
              <div style={styles.label}>Annual Salary ($)</div>
              <input
                style={styles.input}
                value={salaryInput}
                onChange={(e) => setSalaryInput(formatWithCommas(e.target.value))}
                inputMode="decimal"
                placeholder="100,000"
              />
            </>
          ) : (
            <>
              <div style={styles.label}>Hourly Wage ($)</div>
              <input
                style={styles.input}
                value={hourlyInput}
                onChange={(e) => setHourlyInput(formatWithCommas(e.target.value))}
                inputMode="decimal"
                placeholder="50"
              />

              <div style={styles.label}>Hours per week</div>
              <input
                style={styles.input}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(formatWithCommas(e.target.value))}
                inputMode="decimal"
                placeholder="40"
              />
            </>
          )}

          <div style={styles.label}>Filing Status</div>
          <select
            style={styles.select}
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
          >
            {/* Values MUST match your tax engine keys */}
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="mfs">Married Filing Separately</option>
            <option value="hoh">Head of Household</option>
            <option value="qss">Qualifying Surviving Spouse</option>
          </select>

          <div style={styles.helper}>
            Qualifying Surviving Spouse uses the same tax brackets as Married Filing Jointly.
          </div>

          <div style={styles.label}>Show Take-Home As</div>
          <select
            style={styles.select}
            value={payPeriod}
            onChange={(e) => setPayPeriod(e.target.value)}
          >
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div style={styles.takeHomeCard}>
          <div style={styles.takeHomeLabel}>Take-Home Pay ({periodLabel})</div>
          <div style={styles.takeHomeValue}>${fmtMoney2(takeHomePerPeriod)}</div>
        </div>

        <div style={styles.breakdownTitle}>Tax Breakdown ({periodLabel})</div>
        <ul style={styles.ul}>
          <li>Federal Tax: ${fmtMoney2(fedPerPeriod)}</li>
          <li>FICA (SS + Medicare): ${fmtMoney2(ficaPerPeriod)}</li>
          <li>Texas State Income Tax: $0.00</li>
        </ul>
      </div>
    </main>
  );
}
