import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "כס התבונה | The Intelligence Throne",
  description: "A serialized techno-feudal political novel about intelligence, authority, and the systems that decide who gets to act.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
