export const CA_SALARY_PAGES = [
  150000, 175000, 200000, 225000, 250000,
  275000, 300000, 325000, 350000, 375000,
  400000, 425000, 450000, 475000, 500000,
  525000, 550000, 575000, 600000, 625000
].map((n) => ({
  salary: n,
  href: `/california/${n}-salary-after-tax`,
  label: `$${n.toLocaleString()} salary after tax in California`
}));
