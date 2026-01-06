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
  if (!value) return "";
  const parts = String(value).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function stripCommas(value) {
  return String(value || "").replace(/,/g, "");
}

export default function TexasPage() {
  const [payType, setPayType] = useState("salary"); // salary | hourly
  const [salaryInput, setSalaryInput] = useState("120,000");
  const [hourlyInput, setHourlyInput] = useState("65");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [payPeriod, setPayPeriod] = useState("annual");

  // IMPORTANT: These values must match the keys used by your tax engine:
  // single, married, hoh, mfs, qss
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
    return calculateTexasTakeHome({
      annualGross,
      filingStatus
    });
  }, [annualGross, filingStatus]);

  const periods = PAY_PERIODS[payPeriod] || 1;

  // Display values per selected pay period
  const grossPerPeriod = annualGross / periods;
  const netPerPeriod = (result.netAnnual || 0) / periods;

  // Per-period breakdown
  const fedPerPeriod = (result.federalAnnual || 0) / periods;
  const ficaPerPeriod = (result.ficaAnnual || 0) / periods;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Top nav / internal links (SEO + usability) */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold tracking-tight">
            Salary After Tax Calculator
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link className="underline underline-offset-4" href="/">
              California
            </Link>
            <span className="text-slate-400">|</span>
            <span className="font-semibold">Texas</span>
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Texas Salary Calculator (After Tax)
        </h1>
        <p className="mt-2 text-slate-600">
          Estimate your take-home pay in Texas after <b>federal taxes</b> and{" "}
          <b>FICA</b>. Texas has <b>no state income tax</b>.
        </p>

        {/* Controls */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Pay type</label>
              <div className="mt-2 flex gap-2">
                <button
                  className={`w-full rounded-xl border px-3 py-2 text-sm font-semibold ${
                    payType === "salary"
                      ? "border-slate-900"
                      : "border-slate-200 text-slate-600"
                  }`}
                  onClick={() => setPayType("salary")}
                  type="button"
                >
                  Salary
                </button>
                <button
                  className={`w-full rounded-xl border px-3 py-2 text-sm font-semibold ${
                    payType === "hourly"
                      ? "border-slate-900"
                      : "border-slate-200 text-slate-600"
                  }`}
                  onClick={() => setPayType("hourly")}
                  type="button"
                >
                  Hourly
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Filing status</label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
              >
                {/* FIXED: These values match your tax engine keys */}
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="mfs">Married Filing Separately</option>
                <option value="hoh">Head of Household</option>
                <option value="qss">Qualifying Surviving Spouse</option>
              </select>
            </div>

            {payType === "salary" ? (
              <div>
                <label className="text-sm font-semibold">Annual salary</label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  inputMode="decimal"
                  value={salaryInput}
                  onChange={(e) => setSalaryInput(formatWithCommas(e.target.value))}
                  placeholder="120,000"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="text-sm font-semibold">Hourly rate</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    inputMode="decimal"
                    value={hourlyInput}
                    onChange={(e) => setHourlyInput(formatWithCommas(e.target.value))}
                    placeholder="65"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Hours per week</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    inputMode="decimal"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(formatWithCommas(e.target.value))}
                    placeholder="40"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-semibold">Pay period</label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value)}
              >
                <option value="annual">Annual</option>
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-600">Gross ({payPeriod})</div>
            <div className="mt-1 text-2xl font-bold">${fmtMoney2(grossPerPeriod)}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-600">Estimated take-home ({payPeriod})</div>
            <div className="mt-1 text-2xl font-bold">${fmtMoney2(netPerPeriod)}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-600">Effective tax rate</div>
            <div className="mt-1 text-2xl font-bold">
              {((result.effectiveTaxRate || 0) * 100).toFixed(1)}%
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Tax breakdown ({payPeriod})</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-600">Federal income tax</div>
              <div className="mt-1 text-xl font-bold">${fmtMoney2(fedPerPeriod)}</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-600">FICA (SS + Medicare)</div>
              <div className="mt-1 text-xl font-bold">${fmtMoney2(ficaPerPeriod)}</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-600">Texas state income tax</div>
              <div className="mt-1 text-xl font-bold">$0.00</div>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            <b>Footnote:</b> Estimates only. Results vary based on deductions, credits, pre-tax benefits,
            and exact tax-year rules. Texas has no state income tax, but federal and payroll taxes still apply.
          </p>
        </section>

        {/* SEO text */}
        <section className="mt-8 space-y-3 text-sm text-slate-700">
          <h2 className="text-lg font-bold">How Texas taxes work</h2>
          <p>
            Texas does not levy a state income tax on wages. Your take-home pay is mainly reduced by
            federal income tax and payroll taxes (FICA).
          </p>
          <p>
            Want to compare take-home pay? Jump back to the{" "}
            <Link className="underline underline-offset-4" href="/">
              California calculator
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
