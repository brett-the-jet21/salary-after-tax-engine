// app/lib/texasTax.js
import { calculateFederalAndFica } from "./californiaTax";

/**
 * Texas = federal income tax + FICA. No state income tax.
 * Returns fields that the Texas page expects.
 */
export function calculateTexasTakeHome({ annualGross, filingStatus }) {
  const gross = Math.max(0, Number(annualGross || 0));

  const { federalAnnual, ficaAnnual } = calculateFederalAndFica({
    annualGross: gross,
    filingStatus
  });

  const totalTaxAnnual = (Number(federalAnnual) || 0) + (Number(ficaAnnual) || 0);
  const netAnnual = gross - totalTaxAnnual;

  return {
    grossAnnual: gross,
    netAnnual,
    federalAnnual: Number(federalAnnual) || 0,
    ficaAnnual: Number(ficaAnnual) || 0,
    stateAnnual: 0,
    totalTaxAnnual,
    effectiveTaxRate: gross > 0 ? totalTaxAnnual / gross : 0
  };
}

