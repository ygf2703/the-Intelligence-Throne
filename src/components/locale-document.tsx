"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LocaleDocument({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "he";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
  }, [locale]);

  return <div lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>{children}</div>;
}
