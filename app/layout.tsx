import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  // Next.js 15 tilll\u00e5ter inte `axes` samtidigt som explicit weight-array.
  // Vi k\u00f6r variabel-weight ist\u00e4llet, vilket ger fullt spann och l\u00e5ter oss
  // beh\u00e5lla SOFT optical size som designsystemet beg\u00e4r.
  weight: "variable",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dogpark",
  description: "En park, hundratals upplevelser, för dig och din hund.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
