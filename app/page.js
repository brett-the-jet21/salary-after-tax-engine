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

const containerStyle = {
  maxWidth: 920,
  width: "100%",
  margin: "0 auto",
  boxSizing: "border-box"
};

const cardStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "white",
  border: "1px solid #e5e5e5",
  borderRadius: 14,
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  padding: 22
};

const labelStyle = {
  display: "block",
  marginTop: 16,
  fontWeight: 600
};

const helperTextStyle = {
  marginTop: 6,
  fontSize: 12,
  color: "#666"
};

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

const selectStyle = {
  ...inputStyle,
  appearance: "none",
  backgroundColor: "white"
};

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

const seoWrapStyle = {
  marginTop: 26,
  paddingTop: 18,
  borderTop: "1px solid #eee",
  lineHeight: 1.6
};

const seoH2Style = {
  marginTop: 16,
  marginBottom: 8,
  fontSize: 18
};

const seoPStyle = {
  marginTop: 0,
  marginBottom: 10,
  color: "#222"
};

const seoUlStyle = {
  marginTop: 0,
  marginBottom: 10,
  paddingLeft: 18
};

const seoDisclaimerStyle = {
  marginTop: 10,
  fontSize: 12,
  color: "#666"
};

/* -------------------- COMPONENT -------------------- */

export default function Home() {
  const [incomeType, setIncomeType] = useState("annual");
  const [annualSalary, setAnnualSalary] = useState("100000");
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

  return (
    <div style={pageWrapStyle}>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1>California Salary After Tax Calculator</h1>
          <p>
            Estimate your <strong>California take-home pay</strong> using real
            federal and state tax brackets.
          </p>

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

          {incomeType === "annual" ? (
            <label style={labelStyle}>
              Annual Salary ($)
              <input
                value={formatWithCommas(annualSalary)}
                onChange={(e) =>
                  setAnnualSalary(
                    stripCommas(e.target.value).replace(/[^\d]/g, "")
                  )
                }
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
                  onChange={(e) =>
                    setHourlyWage(
                      stripCommas(e.target.value).replace(/[^\d.]/g, "")
                    )
                  }
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
                    onChange={(e) =>
                      setHoursPerWeek(
                        stripCommas(e.target.value).replace(/[^\d]/g, "")
                      )
                    }
                    style={inputStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </label>

                <label style={labelStyle}>
                  Weeks / Year
                  <input
                    value={weeksPerYear}
                    onChange={(e) =>
                      setWeeksPerYear(
                        stripCommas(e.target.value).replace(/[^\d]/g, "")
                      )
                    }
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
              Qualifying Surviving Spouse uses the same tax brackets as Married
              Filing Jointly.
            </div>
          </label>

          <label style={labelStyle}>
            Show Take-Home As
            <select
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
              style={selectStyle}
            >
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

          {/* -------------------- SEO CONTENT -------------------- */}
          <section style={seoWrapStyle} aria-label="California tax calculator details">
            <h2 style={seoH2Style}>How California Salary After-Tax Pay Is Calculated</h2>
            <p style={seoPStyle}>
              Your take-home pay in California is estimated by applying both{" "}
              <strong>federal</strong> and <strong>state</strong> taxes, along with
              required payroll deductions. This calculator estimates net pay based on:
            </p>
            <ul style={seoUlStyle}>
              <li>Federal income tax, based on IRS tax brackets</li>
              <li>California state income tax, which is progressive</li>
              <li>Social Security and Medicare (FICA taxes)</li>
              <li>Standard deduction assumptions</li>
              <li>Filing status (Single, Married Filing Jointly, etc.)</li>
              <li>Pre-tax deductions such as 401(k) or health insurance (if applicable)</li>
            </ul>

            <h2 style={seoH2Style}>California Take-Home Pay Example</h2>
            <p style={seoPStyle}>
              As a simple reference point, a <strong>$100,000</strong> annual salary in California
              often results in roughly <strong>$68,000–$72,000</strong> in take-home pay, depending
              on filing status, benefits, and deductions. Your results may vary based on your
              specific situation.
            </p>

            <h2 style={seoH2Style}>Salary vs Hourly Pay in California</h2>
            <p style={seoPStyle}>
              Hourly and salaried employees can see different paycheck amounts even with similar
              annual earnings:
            </p>
            <ul style={seoUlStyle}>
              <li>Hourly pay is commonly estimated using <strong>2,080 hours</strong> per year</li>
              <li>Overtime can increase taxable income and withholding</li>
              <li>Pay frequency affects paycheck size, not total taxes owed</li>
            </ul>

            <h2 style={seoH2Style}>How Filing Status Affects California Taxes</h2>
            <p style={seoPStyle}>
              Filing status affects your tax brackets and how much is withheld:
            </p>
            <ul style={seoUlStyle}>
              <li>Single filers generally reach higher marginal rates sooner</li>
              <li>Married filing jointly may benefit from wider tax brackets</li>
              <li>Head of household can reduce taxable income</li>
              <li>Married filing separately often results in higher total taxes</li>
            </ul>

            <h2 style={seoH2Style}>Why California Paychecks Are Lower Than Expected</h2>
            <p style={seoPStyle}>
              Many workers are surprised by the gap between gross pay and take-home pay. Common
              reasons include:
            </p>
            <ul style={seoUlStyle}>
              <li>Progressive California income tax brackets</li>
              <li>Mandatory FICA payroll deductions</li>
              <li>Employer withholding assumptions</li>
              <li>Benefits and retirement contributions</li>
            </ul>

            <p style={seoDisclaimerStyle}>
              Updated for the 2026 tax year. Estimates are for informational purposes only.
            </p>
          </section>
          {/* ------------------ END SEO CONTENT ------------------ */}

          {/* ✅ FOOTNOTE RESTORED */}
          <div style={footnoteStyle}>
            Estimates are based on current federal and California tax brackets
            and standard deductions. Results do not include itemized deductions,
            tax credits, pre-tax benefits, retirement contributions, or employer-
            sponsored deductions. This calculator is for informational purposes
            only and should not be considered tax advice.
          </div>
        </div>
      </div>
    </div>
  );
}
