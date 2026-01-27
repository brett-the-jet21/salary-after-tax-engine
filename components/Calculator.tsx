"use client";

import { useMemo, useState } from "react";
import { calculateCaliforniaTakeHome } from "../app/lib/californiaTax.js";

const PAY_PERIODS: Record<string, number> = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52
};

function fmtMoney2(n: any) {
  return (Number(n) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatWithCommas(value: string) {
  if (!value) return "";
  const parts = String(value).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function stripCommas(value: string) {
  return String(value || "").replace(/,/g, "");
}

export default function Calculator({
  presetSalary,
  presetHourly
}: {
  presetSalary?: string | number;
  presetHourly?: string | number;
}) {
  const [mode, setMode] = useState<"salary" | "hourly">(presetHourly ? "hourly" : "salary");
  const [payPeriod, setPayPeriod] = useState<keyof typeof PAY_PERIODS>("annual");

  const [salary, setSalary] = useState<string>(
    presetSalary ? String(presetSalary) : ""
  );
  const [hourly, setHourly] = useState<string>(
    presetHourly ? String(presetHourly) : ""
  );
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");

  const annualIncome = useMemo(() => {
    if (mode === "salary") return Number(stripCommas(salary)) || 0;
    const r = Number(stripCommas(hourly)) || 0;
    const h = Number(stripCommas(hoursPerWeek)) || 0;
    return r * h * 52;
  }, [mode, salary, hourly, hoursPerWeek]);

  const results = useMemo(() => {
    const filingStatus = "single"; // keep simple for SEO pages; your main page can have full selector
    const r = calculateCaliforniaTakeHome({ salary: annualIncome, filingStatus });
  
  // --- Normalize tax output across main + SEO pages ---
  const gross = Number(r?.gross ?? annualIncome ?? 0);

  const fica = Number(
    r?.fica ??
      r?.ficaTax ??
      r?.payrollTax ??
      0
  );

  const sdi = Number(
    r?.caSDI ??
      r?.sdi ??
      r?.sdiTax ??
      0
  );

  const fed = Number(
    r?.federalTax ??
      r?.federalIncomeTax ??
      r?.federal ??
      r?.federal_income_tax ??
      0
  );

  const ca = Number(
    r?.caStateTax ??
      r?.stateTax ??
      r?.stateIncomeTax ??
      r?.californiaTax ??
      r?.californiaStateTax ??
      r?.caIncomeTax ??
      r?.ca_income_tax ??
      r?.state ??
      0
  );

  let net = Number(
    r?.takeHomePay ??
      r?.netAnnual ??
      r?.netPay ??
      r?.net ??
      r?.takeHome ??
      0
  );

  // If engine doesn’t return net, compute it from the components
  if (!Number.isFinite(net) || net <= 0) {
    net = gross - fed - ca - fica - sdi;
  }

  // Write back canonical keys used by the UI
  r.gross = gross;
  r.fica = fica;
  r.caSDI = sdi;
  r.federalTax = fed;
  r.caStateTax = ca;
  r.takeHomePay = net;


  
    return r;
  }, [annualIncome]);

  const periodDiv = PAY_PERIODS[payPeriod] || 1;

  // These fields depend on your calculateCaliforniaTakeHome return shape.
  // We safely read common keys; if any are missing, they show as 0.00.
  const netAnnual = Number((results as any)?.netAnnual ?? (results as any)?.net ?? 0) || 0;
  const fedAnnual = Number((results as any)?.federalTax ?? 0) || 0;
  const stateAnnual = Number((results as any)?.stateTax ?? (results as any)?.californiaTax ?? 0) || 0;
  const ficaAnnual = Number((results as any)?.fica ?? (results as any)?.payrollTax ?? 0) || 0;
  const sdiAnnual = Number((results as any)?.sdi ?? (results as any)?.caSdi ?? 0) || 0;

  return (
    <section style={{ marginTop: 18 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setMode("salary")}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: mode === "salary" ? "#111" : "#fff",
              color: mode === "salary" ? "#fff" : "#111",
              cursor: "pointer"
            }}
          >
            Salary
          </button>
          <button
            onClick={() => setMode("hourly")}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: mode === "hourly" ? "#111" : "#fff",
              color: mode === "hourly" ? "#fff" : "#111",
              cursor: "pointer"
            }}
          >
            Hourly
          </button>
        </div>

        <label style={{ marginLeft: 6 }}>
          <span style={{ fontSize: 13, color: "#444" }}>Pay period</span><br/>
          <select
            value={payPeriod}
            onChange={(e) => setPayPeriod(e.target.value as any)}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb" }}
          >
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
            <option value="biweekly">Biweekly</option>
            <option value="weekly">Weekly</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {mode === "salary" ? (
          <label>
            <span style={{ fontSize: 13, color: "#444" }}>Annual salary</span><br/>
            <input
              value={formatWithCommas(salary)}
              onChange={(e) => setSalary(stripCommas(e.target.value))}
              inputMode="numeric"
              placeholder="e.g. 100000"
              style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }}
            />
          </label>
        ) : (
          <>
            <label>
              <span style={{ fontSize: 13, color: "#444" }}>Hourly rate</span><br/>
              <input
                value={formatWithCommas(hourly)}
                onChange={(e) => setHourly(stripCommas(e.target.value))}
                inputMode="decimal"
                placeholder="e.g. 35"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }}
              />
            </label>
            <label>
              <span style={{ fontSize: 13, color: "#444" }}>Hours per week</span><br/>
              <input
                value={formatWithCommas(hoursPerWeek)}
                onChange={(e) => setHoursPerWeek(stripCommas(e.target.value))}
                inputMode="numeric"
                placeholder="40"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }}
              />
            </label>
          </>
        )}
      </div>

      <div style={{ marginTop: 16, padding: 14, border: "1px solid #e5e7eb", borderRadius: 14, background: "#fff" }}>
        <h3 style={{ margin: 0 }}>Estimated take-home pay</h3>
        <p style={{ margin: "6px 0 0", fontSize: 28, fontWeight: 700 }}>
          $ {fmtMoney2(netAnnual / periodDiv)}
          <span style={{ fontSize: 14, fontWeight: 500, color: "#555" }}> / {payPeriod}</span>
        </p>

        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          <div><strong>Gross</strong><br/>$ {fmtMoney2(annualIncome / periodDiv)}</div>
          <div><strong>Federal tax</strong><br/>$ {fmtMoney2(fedAnnual / periodDiv)}</div>
          <div><strong>CA state tax</strong><br/>$ {fmtMoney2(stateAnnual / periodDiv)}</div>
          <div><strong>FICA</strong><br/>$ {fmtMoney2(ficaAnnual / periodDiv)}</div>
          <div><strong>CA SDI</strong><br/>$ {fmtMoney2(sdiAnnual / periodDiv)}</div>
        </div>

        <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
          Note: SEO pages use a simplified filing status (single). Your main calculator can keep the full filing-status selector.
        </p>
      </div>
    </section>
  );
}
