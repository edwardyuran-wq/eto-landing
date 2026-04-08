import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eto Capital",
  description:
    "Partner till framtidens ledare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
