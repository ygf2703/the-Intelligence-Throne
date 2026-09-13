import "./globals.css";
import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import { LocaleDocument } from "@/components/locale-document";

const assistant = Assistant({ subsets: ["hebrew", "latin"], variable: "--font-assistant", weight: ["300", "400", "500", "600", "700", "800"], display: "swap" });
export const metadata: Metadata = { title: "כס התבונה | The Intelligence Throne", description: "A serialized techno-feudal political novel about intelligence, authority, and the systems that decide who gets to act." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="he" dir="rtl" suppressHydrationWarning className={assistant.variable}><body><LocaleDocument>{children}</LocaleDocument></body></html>; }
