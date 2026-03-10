"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import DarkModeToggle from "./DarkModeToggle";

interface Props {
  locale?: Locale;
}

const krCalcs = [
  { href: "/kr/freelancer-tax-calculator", label: "종합소득세 계산기" },
  { href: "/kr/earned-income-tax-calculator", label: "근로소득세 계산기" },
  { href: "/kr/vat-calculator", label: "부가가치세 계산기" },
  { href: "/kr/severance-calculator", label: "퇴직금 계산기" },
];

const usCalcs = [
  { href: "/us/1099-tax-calculator", label: "1099 Tax Calculator" },
  { href: "/us/w2-vs-1099-calculator", label: "W-2 vs 1099 Calculator" },
  { href: "/us/home-office-deduction-calculator", label: "Home Office Deduction" },
  { href: "/us/mileage-deduction-calculator", label: "Mileage Deduction" },
];

export default function Header({ locale = "en" }: Props) {
  const isKo = locale === "ko";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calcs = isKo ? krCalcs : usCalcs;

  return (
    <header className="border-b border-gray-200 bg-white dark:border-dark-border dark:bg-dark-surface">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={isKo ? "/kr" : "/us"}
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          CalcHub
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isKo ? "계산기" : "Calculators"} ▾
            </button>
            {open && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-dark-border dark:bg-dark-surface">
                {calcs.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-border"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href={isKo ? "/us" : "/kr"}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            {isKo ? "US 계산기" : "KR Calculators"}
          </Link>
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}
