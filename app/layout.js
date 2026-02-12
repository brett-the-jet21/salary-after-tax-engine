import Script from "next/script";

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
        <Script async strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8025748227928688" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0 }}>{children}<footer style={{padding:"24px",textAlign:"center",fontSize:"14px",opacity:0.8}}>
  <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy Policy</a>
</footer>
</body>
    </html>
  );
}
