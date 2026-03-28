import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eto Capital — Nordic Growth Partners",
  description:
    "Eto Capital is a values-driven Nordic firm partnering with entrepreneurs to build market-leading companies across regulated sectors.",
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
