export function calculateCaliforniaTakeHome(salary) {
  const s = Math.max(0, Number(salary || 0));

  // Federal (simple effective estimate for v1)
  const federal = s * 0.14;

  // FICA
  const socialSecurity = Math.min(s, 168600) * 0.062;
  const medicare = s * 0.0145;
  const fica = socialSecurity + medicare;

  // California state tax (effective placeholder)
  const state = s * 0.06;

  // California SDI (1.3%)
  const sdi = s * 0.013;

  const totalTax = federal + fica + state + sdi;
  const takeHome = s - totalTax;

  return {
    federal: Math.round(federal),
    fica: Math.round(fica),
    state: Math.round(state),
    sdi: Math.round(sdi),
    takeHome: Math.round(takeHome)
  };
}
