import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinancialFamilies | Start",
  description: "Interactive prospect presentation for FinancialFamilies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}