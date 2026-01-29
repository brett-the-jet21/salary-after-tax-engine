/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/how-much-is-100k-after-tax-in-california',
        destination: '/salary/100000-after-tax-california',
        permanent: true,
      },
      {
        source: '/california-paycheck-calculator',
        destination: '/salary',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

