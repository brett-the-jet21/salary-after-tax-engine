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
                      : "border-sla
