"use client";

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

// Format a numeric string with commas, preserving optional decimals
function formatWithCommas(value) {
  if (!value) return "";
  const parts = String(value).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function stripCommas(value) {
  return String(value || "").replace(/,/g, "");
}

// ---------- Professional UI styles (no logic changes) ----------
const pageWrapStyle = {
  minHeight: "100vh",
  background: "#fafafa",
  padding: "40px 16px",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"'
};

const containerStyle = {
  maxWidth: 920,
  margin: "0 auto"
};

const cardStyle = {
  background: "white",
  border: "1px solid #e6e6e6",
  borderRadius: 14,
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  padding: 22
};

const h1Style = {
  margin: 0,
  fontSize: 34,
  letterSpacing: "-0.02em"
};

const subtitleStyle = {
  marginTop: 10,
  marginBottom: 0,
  color: "#444",
  lineHeight: 1.5
};

const sectionStyle = {
  marginTop: 18,
  paddingTop: 18,
  borderTop: "1px solid #eee"
};

const labelStyle = {
  display: "block",
  marginTop: 14,
  fontWeight: 600
};

const helperTextStyle = {
  marginTop: 6,
  fontSize: 12,
  color: "#666",
  lineHeight: 1.4
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  marginTop: 8,
  borderRadius: 10,
  border: "1px solid #d9d9d9",
  background: "white",
  fontSize: "inherit",
  lineHeight: 1.2,
  outline: "none",
  transition: "border-color 120ms ease, box-shadow 120ms ease"
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
  backgroundImage:
    "linear-gradient(45deg, transparent 50%, #666 50%), linear-gradient(135deg, #666 50%, transparent 50%)",
  backgroundPosition: "calc(100% - 18px) calc(50% - 2px), calc(100% - 13px) calc(50% - 2px)",
  backgroundSize: "5px 5px, 5px 5px",
  backgroundRepeat: "no-repeat",
  paddingRight: 34
};

const focusOn = (e) => {
  e.target.style.borderColor = "#111";
  e.target.style.boxShadow = "0 0 0 4px rgba(0,0,0,0.06)";
};
const focusOff = (e) => {
  e.target.style.borderColor = "#d9d9d9";
  e.target.style.boxShadow = "none";
};

const toggleWrapStyle = {
  marginTop: 18,
  display: "inline-flex",
  gap: 0,
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  overflow: "hidden",
  background: "#f6f6f6"
};

const toggleBtnStyle = (active) => ({
  padding: "10px 14px",
  border: "none",
  cursor: "pointer",
  background: active ? "white" : "transparent",
  fontWeight: active ? 700 : 600,
  color: "#111",
  transition: "background 120ms ease",
  fontSize: "inherit"
});

const grid2Style = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginTop: 12
};

const resultCardStyle = {
  marginTop: 18,
  padding: 18,
  border: "1px solid #e6e6e6",
  borderRadius: 14,
  background: "linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%)"
};

const resultLabelStyle = {
  fontSize: 13,
  color: "#666"
};

const resultValueStyle = {
  marginTop: 6,
  fontSize: 36,
  fontWeight: 800,
  letterSpacing: "-0.02em"
};

const breakdownListStyle = {
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.9,
  paddingLeft: 18
};

const footerNoteStyle = {
  marginTop: 18,
  fontSize: 12,
  color: "#666",
  lineHeight: 1.5
};
// -------------------------------------------------------------

export default function Home() {
  const [incomeType, setIncomeType] = useState("annual"); // "annual" | "hourly"

  // Store raw digits (no commas) for annual; render with commas
  const [annualSalary, setAnnualSalary] = useState("100000");

  // Store raw (no commas); hourly allows decimals
  const [hourlyWage, setHourlyWage] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  // Filing statuses: single, married (MFJ), mfs, hoh, qss
  const [filingStatus, setFilingStatus] = useState("single");

  const [payPeriod, setPayPeriod] = useState("annual"); // annual | monthly | biweekly | weekly

  const salary = useMemo(() => {
    if (incomeType === "hourly") {
      const h = Math.max(0, Number(stripCommas(hourlyWage) || 0));
      const hpw = Math.max(0, Number(stripCommas(hoursPerWeek) || 0));
      const wpy = Math.max(0, Number(stripCommas(weeksPerYear) || 0));
      return h * hpw * wpy;
    }
    return Math.max(0, Number(stripCommas(annualSalary) || 0));
  }, [incomeType, hourlyWage, hoursPerWeek, weeksPerYear, annualSalary]);

  const result = useMemo(() => {
    return calculateCaliforniaTakeHome({
      salary,
      filingStatus
    });
  }, [salary, filingStatus]);

  const divisor = PAY_PERIODS[payPeriod] || 1;

  // Pay-period breakdown values
  const takeHomePP = result.takeHome / divisor;
  const federalPP = result.federal / divisor;
  const statePP = result.state / divisor;
  const ficaPP = result.fica / divisor;
  const sdiPP = result.sdi / divisor;

  const payPeriodLabel = useMemo(() => {
    if (payPeriod === "biweekly") return "Bi-weekly";
    if (payPeriod === "weekly") return "Weekly";
    if (payPeriod === "monthly") return "Monthly";
    return "Annual";
  }, [payPeriod]);

  return (
    <div style={pageWrapStyle}>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={h1Style}>California Salary After Tax Calculator</h1>
          <p style={subtitleStyle}>
            Estimate your <strong>California take-home pay</strong> using real federal and California tax
            brackets. Supports salary and hourly wages.
          </p>

          {/* Income type toggle */}
          <div style={toggleWrapStyle}>
            <button
              onClick={() => setIncomeType("annual")}
              style={toggleBtnStyle(incomeType === "annual")}
            >
              Annual Salary
            </button>
            <button
              onClick={() => setIncomeType("hourly")}
              style={toggleBtnStyle(incomeType === "hourly")}
            >
              Hourly Wage
            </button>
          </div>

          <div style={sectionStyle}>
            {/* Inputs */}
            {incomeType === "annual" ? (
              <label style={labelStyle}>
                Annual Salary ($)
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatWithCommas(annualSalary)}
                  onChange={(e) => {
                    const raw = stripCommas(e.target.value).replace(/[^\d]/g, "");
                    setAnnualSalary(raw);
                  }}
                  style={inputStyle}
                  placeholder="e.g. 75,000"
                  onFocus={focusOn}
                  onBlur={focusOff}
                />
              </label>
            ) : (
              <div style={{ marginTop: 2 }}>
                <label style={labelStyle}>
                  Hourly Wage ($/hr)
                  <input
                    type="text"
                    inputMode="decimal"
                    value={formatWithCommas(hourlyWage)}
                    onChange={(e) => {
                      let raw = stripCommas(e.target.value).replace(/[^\d.]/g, "");
                      const parts = raw.split(".");
                      if (parts.length > 2) raw = parts[0] + "." + parts.slice(1).join("");
                      setHourlyWage(raw);
                    }}
                    style={inputStyle}
                    placeholder="e.g. 30 or 30.50"
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </label>

                <div style={grid2Style}>
                  <label style={{ ...labelStyle, marginTop: 0 }}>
                    Hours / Week
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatWithCommas(hoursPerWeek)}
                      onChange={(e) => {
                        const raw = stripCommas(e.target.value).replace(/[^\d]/g, "");
                        setHoursPerWeek(raw);
                      }}
                      style={inputStyle}
                      placeholder="e.g. 40"
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </label>

                  <label style={{ ...labelStyle, marginTop: 0 }}>
                    Weeks / Year
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatWithCommas(weeksPerYear)}
                      onChange={(e) => {
                        const raw = stripCommas(e.target.value).replace(/[^\d]/g, "");
                        setWeeksPerYear(raw);
                      }}
                      style={inputStyle}
                      placeholder="e.g. 52"
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </label>
                </div>

                <div style={helperTextStyle}>
                  Annualized salary used for taxes: <strong>${fmtMoney2(salary)}</strong>
                </div>
              </div>
            )}

            {/* Filing Status */}
            <label style={labelStyle}>
              Filing Status
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                style={selectStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="mfs">Married Filing Separately</option>
                <option value="hoh">Head of Household</option>
                <option value="qss">Qualifying Surviving Spouse</option>
              </select>
              <div style={helperTextStyle}>
                Note: Qualifying Surviving Spouse uses the same tax brackets as Married Filing Jointly.
              </div>
            </label>

            {/* Output Pay Period */}
            <label style={labelStyle}>
              Show Take-Home As
              <select
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value)}
                style={selectStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              >
                <option value="annual">Annual</option>
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>

            {/* Results */}
            <div style={resultCardStyle}>
              <div style={resultLabelStyle}>Take-Home Pay ({payPeriodLabel})</div>
              <div style={resultValueStyle}>${fmtMoney2(takeHomePP)}</div>
            </div>

            <h2 style={{ marginTop: 18, marginBottom: 6 }}>Tax Breakdown ({payPeriodLabel})</h2>
            <ul style={breakdownListStyle}>
              <li>Federal Tax: ${fmtMoney2(federalPP)}</li>
              <li>California Tax: ${fmtMoney2(statePP)}</li>
              <li>FICA: ${fmtMoney2(ficaPP)}</li>
              <li>CA SDI: ${fmtMoney2(sdiPP)}</li>
            </ul>

            <p style={footerNoteStyle}>
              Estimates based on tax brackets and standard deductions. Does not include itemized deductions,
              credits, or employer benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
