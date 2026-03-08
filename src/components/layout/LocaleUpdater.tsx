"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLocaleFromPath } from "@/lib/locale";

export default function LocaleUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = getLocaleFromPath(pathname);
  }, [pathname]);

  return null;
}
