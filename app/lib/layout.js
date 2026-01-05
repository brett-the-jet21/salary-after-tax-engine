export const metadata = {
  title: "California Salary After Tax Calculator",
  description:
    "Estimate your California take-home pay after federal tax, FICA, California state income tax, and CA SDI."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
