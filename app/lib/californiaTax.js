// app/lib/californiaTax.js

const FEDERAL_BRACKETS = {
  single: [
    [11000, 0.10],
    [44725, 0.12],
    [95375, 0.22],
    [182100, 0.24],
    [231250, 0.32],
    [578125, 0.35],
    [Infinity, 0.37]
  ],
  married: [
    [22000, 0.10],
    [89450, 0.12],
    [190750, 0.22],
    [364200, 0.24],
    [462500, 0.32],
    [693750, 0.35],
    [Infinity, 0.37]
  ],
  hoh: [
    [15700, 0.10],
    [59850, 0.12],
    [95350, 0.22],
    [182100, 0.24],
    [231250, 0.32],
    [578100, 0.35],
    [Infinity, 0.37]
  ],
  // Married Filing Separately: same as Single for brackets (federal)
  mfs: [
    [11000, 0.10],
    [44725, 0.12],
    [95375, 0.22],
    [182100, 0.24],
    [231250, 0.32],
    [346875, 0.35],
    [Infinity, 0.37]
  ]
};

const CA_BRACKETS = {
  single: [
    [10412, 0.01],
    [24684, 0.02],
    [38959, 0.04],
    [54081, 0.06],
    [68350, 0.08],
    [349137, 0.093],
    [418961, 0.103],
    [698271, 0.113],
    [Infinity, 0.123]
  ],
  married: [
    [20824, 0.01],
    [49368, 0.02],
    [77918, 0.04],
    [108162, 0.06],
    [136700, 0.08],
    [698274, 0.093],
    [837922, 0.103],
    [1396542, 0.113],
    [Infinity, 0.123]
  ],
  hoh: [
    [20839, 0.01],
    [49371, 0.02],
    [63644, 0.04],
    [78765, 0.06],
    [93037, 0.08],
    [474824, 0.093],
    [569790, 0.103],
    [949649, 0.113],
    [Infinity, 0.123]
  ],
  // CA MFS effectively uses single schedule for our purposes here
  mfs: [
    [10412, 0.01],
    [24684, 0.02],
    [38959, 0.04],
    [54081, 0.06],
    [68350, 0.08],
    [349137, 0.093],
    [418961, 0.103],
    [698271, 0.113],
    [Infinity, 0.123]
  ]
};

const FEDERAL_DEDUCTION = {
  single: 13850,
  married: 27700,
  hoh: 20800,
  mfs: 13850,
  // Qualifying Surviving Spouse uses MFJ deduction
  qss: 27700
};

const CA_DEDUCTION = {
  single: 5202,
  married: 10404,
  hoh: 10404,
  mfs: 5202,
  // QSS treated like MFJ for deduction
  qss: 10404
};

function calculateProgressiveTax(income, brackets) {
  let tax = 0;
  let prevLimit = 0;

  for (const [limit, rate] of brackets) {
    const taxable = Math.min(limit - prevLimit, Math.max(0, income - prevLimit));
    tax += taxable * rate;
    prevLimit = limit;
    if (income <= limit) break;
  }
  return tax;
}

export function calculateCaliforniaTakeHome({ salary, filingStatus }) {
  const s = Math.max(0, Number(salary || 0));

  // Map Qualifying Surviving Spouse to MFJ brackets
  const status = filingStatus === "qss" ? "married" : filingStatus;

  const fedDeduction = FEDERAL_DEDUCTION[filingStatus] ?? FEDERAL_DEDUCTION[status] ?? 0;
  const caDeduction = CA_DEDUCTION[filingStatus] ?? CA_DEDUCTION[status] ?? 0;

  const fedTaxable = Math.max(0, s - fedDeduction);
  const caTaxable = Math.max(0, s - caDeduction);

  const federal = calculateProgressiveTax(fedTaxable, FEDERAL_BRACKETS[status]);
  const state = calculateProgressiveTax(caTaxable, CA_BRACKETS[status]);

  // FICA
  const socialSecurity = Math.min(s, 168600) * 0.062;
  const medicare = s * 0.0145;
  const fica = socialSecurity + medicare;

  // CA SDI (simple placeholder rate)
  const sdi = s * 0.013;

  const totalTax = federal + state + fica + sdi;

  const out = {
    federal,
    state,
    fica,
    sdi,
    takeHome: s - totalTax
  };

  // --- Canonical keys for ALL pages (main + SEO microsites) ---
  // Federal
  if (out.federalTax == null) out.federalTax = out.federalIncomeTax ?? out.federal ?? 0;

  // California
  if (out.caStateTax == null) out.caStateTax = out.stateTax ?? out.stateIncomeTax ?? out.caTax ?? 0;

  // Take-home
  if (out.takeHomePay == null) {
    out.takeHomePay = out.netAnnual ?? out.netPay ?? out.net ?? (
      (out.gross ?? 0) - (out.federalTax ?? 0) - (out.caStateTax ?? 0) - (out.fica ?? 0) - (out.caSDI ?? 0)
    );
  }

  return out;
}
