
export const metadata = {
  metadataBase: new URL("https://www.californiasalaryaftertax.com"),
  title: "California Salary After Tax Calculator (2026) – Take-Home Pay",
  description:
    "Calculate your California take-home pay after federal tax, FICA, California state income tax, and CA SDI. Fast, accurate, and free."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  {/* ADSENSE DISABLED FOR REVIEW */}
</head>
      <body style={{ margin: 0 }}>{children}
        <div style={{ fontSize: "13px", color: "#666", margin: "12px 0" }}>
          Last updated: February 2026 • Calculations by CaliforniaSalaryAfterTax.com
        </div><footer style={{padding:"24px",textAlign:"center",fontSize:"14px",opacity:0.8}}>
  <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy Policy</a>
</footer>
</body>
    </html>
  );
}
