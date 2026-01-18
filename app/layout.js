import "./globals.css";

export const metadata = {
  title: "California Salary After Tax Calculator",
  description:
    "Estimate your California take-home pay after federal tax, FICA, California state income tax, and CA SDI."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
