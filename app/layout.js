export const metadata = {
  title: "California Salary After Tax Calculator (2026) – Take-Home Pay",
  description:
    "Calculate your California take-home pay after federal tax, FICA, California state income tax, and CA SDI. Fast, accurate, and free."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8025748227928688"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
