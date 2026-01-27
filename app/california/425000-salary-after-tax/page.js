"use client";

import FAQSchema from "../../components/FAQSchema";
import InternalLinks from "../../components/InternalLinks";

import { useEffect, useMemo, useState } from "react";
import { calculateCaliforniaTakeHome } from "../../lib/californiaTax";

const PAY_PERIODS = { annual: 1, monthly: 12, biweekly: 26, weekly: 52 };

function fmtMoney2(n) {
  return (Number(n) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function formatWithCommas(value) {
  if (!value) return "";
  const parts = String(value).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function stripCommas(value) {
  return String(value || "").replace(/,/g, "");
}

/* -------------------- STYLES -------------------- */
const pageWrapStyle = {
  minHeight: "100vh",
  background: "#fafafa",
  padding: "32px 16px",
  overflowX: "hidden",
  boxSizing: "border-box",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
};
const containerStyle = { maxWidth: 920, width: "100%", margin: "0 auto", boxSizing: "border-box" };
const cardStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "white",
  border: "1px solid #e5e5e5",
  borderRadius: 14,
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  padding: 22
};
const labelStyle = { display: "block", marginTop: 16, fontWeight: 600 };
const helperTextStyle = { marginTop: 6, fontSize: 12, color: "#666" };
const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  marginTop: 6,
  borderRadius: 10,
  border: "1px solid #d9d9d9",
  fontSize: "inherit",
  boxSizing: "border-box",
  outline: "none"
};
const selectStyle = { ...inputStyle, appearance: "none", backgroundColor: "white" };
const focusOn = (e) => {
  e.target.style.borderColor = "#111";
  e.target.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.06)";
};
const focusOff = (e) => {
  e.target.style.borderColor = "#d9d9d9";
  e.target.style.boxShadow = "none";
};
const toggleWrapStyle = {
  marginTop: 18,
  display: "inline-flex",
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  overflow: "hidden",
  background: "#f6f6f6"
};
const toggleBtnStyle = (active) => ({
  padding: "10px 14px",
  border: "none",
  background: active ? "white" : "transparent",
  fontWeight: active ? 700 : 600,
  cursor: "pointer"
});
const grid2Style = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 };
const resultCardStyle = {
  marginTop: 18,
  padding: 18,
  border: "1px solid #e6e6e6",
  borderRadius: 14,
  background: "#fafafa"
};
const footnoteStyle = {
  marginTop: 18,
  paddingTop: 12,
  borderTop: "1px solid #eee",
  fontSize: 12,
  color: "#666",
  lineHeight: 1.5
};
const seoWrapStyle = { marginTop: 26, paddingTop: 18, borderTop: "1px solid #eee", lineHeight: 1.6 };
const seoH2Style = { marginTop: 16, marginBottom: 8, fontSize: 18 };
const seoPStyle = { marginTop: 0, marginBottom: 10, color: "#222" };
const seoUlStyle = { marginTop: 0, marginBottom: 10, paddingLeft: 18 };
const seoDisclaimerStyle = { marginTop: 10, fontSize: 12, color: "#666" };
const faqItemStyle = { marginBottom: 10 };

export default function Page() {
  const [incomeType, setIncomeType] = useState("annual");
  const [annualSalary, setAnnualSalary] = useState("425000");
  const [hourlyWage, setHourlyWage] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [filingStatus, setFilingStatus] = useState("single");
  const [payPeriod, setPayPeriod] = useState("annual");

  const salary = useMemo(() => {
    if (incomeType === "hourly") {
      return (
        Number(stripCommas(hourlyWage) || 0) *
        Number(stripCommas(hoursPerWeek) || 0) *
        Number(stripCommas(weeksPerYear) || 0)
      );
    }
    return Number(stripCommas(annualSalary) || 0);
  }, [incomeType, hourlyWage, hoursPerWeek, weeksPerYear, annualSalary]);

  const result = useMemo(
    () => calculateCaliforniaTakeHome({ salary, filingStatus }),
    [salary, filingStatus]
  );

  const divisor = PAY_PERIODS[payPeriod];
  const label =
    payPeriod === "biweekly"
      ? "Bi-weekly"
      : payPeriod === "weekly"
      ? "Weekly"
      : payPeriod === "monthly"
      ? "Monthly"
      : "Annual";

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, [incomeType, annualSalary, hourlyWage, hoursPerWeek, weeksPerYear, filingStatus, payPeriod]);

  const salaryText = Number("425000").toLocaleString();

  return (
    <div style={pageWrapStyle}>
      <FAQSchema />
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1>${salaryText} Salary After Tax in California (2026)</h1>
          <p>
            Estimate your <strong>California take-home pay</strong> for a ${salaryText} salary
            after federal tax, FICA, California state tax, and CA SDI.
          </p>

          <div style={toggleWrapStyle}>
            <button onClick={() => setIncomeType("annual")} style={toggleBtnStyle(incomeType === "annual")}>
              Annual Salary
            </button>
            <button onClick={() => setIncomeType("hourly")} style={toggleBtnStyle(incomeType === "hourly")}>
              Hourly Wage
            </button>
          </div>

          {incomeType === "annual" ? (
            <label style={labelStyle}>
              Annual Salary ($)
              <input
                value={formatWithCommas(annualSalary)}
                onChange={(e) => setAnnualSalary(stripCommas(e.target.value).replace(/[^\d]/g, ""))}
                style={inputStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              />
            </label>
          ) : (
            <>
              <label style={labelStyle}>
                Hourly Wage ($/hr)
                <input
                  value={formatWithCommas(hourlyWage)}
                  onChange={(e) => setHourlyWage(stripCommas(e.target.value).replace(/[^\d.]/g, ""))}
                  style={inputStyle}
                  onFocus={focusOn}
                  onBlur={focusOff}
                />
              </label>

              <div style={grid2Style}>
                <label style={labelStyle}>
                  Hours / Week
                  <input
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(stripCommas(e.target.value).replace(/[^\d]/g, ""))}
                    style={inputStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </label>

                <label style={labelStyle}>
                  Weeks / Year
                  <input
                    value={weeksPerYear}
                    onChange={(e) => setWeeksPerYear(stripCommas(e.target.value).replace(/[^\d]/g, ""))}
                    style={inputStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </label>
              </div>
            </>
          )}

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
              Qualifying Surviving Spouse uses the same tax brackets as Married Filing Jointly.
            </div>
          </label>

          <label style={labelStyle}>
            Show Take-Home As
            <select value={payPeriod} onChange={(e) => setPayPeriod(e.target.value)} style={selectStyle}>
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </label>

          <div style={resultCardStyle}>
            <div>Take-Home Pay ({label})</div>
            <div style={{ fontSize: 34, fontWeight: 800 }}>
              ${fmtMoney2(result.takeHome / divisor)}
            </div>
          </div>

          <h2>Tax Breakdown ({label})</h2>
          <ul>
            <li>Federal Tax: ${fmtMoney2(result.federal / divisor)}</li>
            <li>California Tax: ${fmtMoney2(result.state / divisor)}</li>
            <li>FICA: ${fmtMoney2(result.fica / divisor)}</li>
            <li>CA SDI: ${fmtMoney2(result.sdi / divisor)}</li>
          </ul>

          {/* ✅ MONEY SLOT #1 */}
          <div style={{ margin: "28px 0", textAlign: "center" }}>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8025748227928688"
              data-ad-slot="5511951512"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <section style={seoWrapStyle} aria-label="California salary after tax calculator details">
            <h2 style={seoH2Style}>${salaryText} Salary After Tax in California</h2>
            <p style={seoPStyle}>
              This page estimates your <strong>California take-home pay</strong> (net pay) for a
              <strong> ${salaryText} salary</strong> after <strong>federal income tax</strong>, <strong>FICA</strong>,
              <strong> California state income tax</strong>, and <strong>CA SDI</strong>.
            </p>

            <h2 style={seoH2Style}>What this calculator includes</h2>
            <ul style={seoUlStyle}>
              <li>Federal income tax (IRS brackets)</li>
              <li>California state income tax (progressive rates)</li>
              <li>FICA payroll taxes (Social Security + Medicare)</li>
              <li>California State Disability Insurance (CA SDI)</li>
              <li>Standard deduction assumptions</li>
              <li>Filing status</li>
            </ul>

            <h2 style={seoH2Style}>Frequently Asked Questions</h2>

            <div style={faqItemStyle}>
              <strong>Does this include CA SDI?</strong>
              <div style={seoPStyle}>Yes. CA SDI is included as a payroll deduction estimate.</div>
            </div>

            <div style={faqItemStyle}>
              <strong>Is this exact?</strong>
              <div style={seoPStyle}>
                It’s an estimate. Your actual paycheck can vary based on benefits, 401(k), HSA, bonuses,
                and employer withholding.
              </div>
            </div>

            <p style={seoDisclaimerStyle}>
              Updated for the 2026 tax year. Estimates are for informational purposes only.
            </p>
          </section>

          <InternalLinks />

          <div style={footnoteStyle}>
            Estimates are based on current federal and California tax brackets and standard deductions.
            Results do not include itemized deductions, tax credits, pre-tax benefits, retirement contributions,
            or employer-sponsored deductions. This calculator is for informational purposes only and should not be considered tax advice.
          </div>
        </div>
      </div>
    </div>
  );
}
