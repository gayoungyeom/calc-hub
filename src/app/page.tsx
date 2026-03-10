import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CalcHub — Smart Tax Calculators | 세금 계산, 5초면 충분합니다",
  description:
    "Free tax calculators for freelancers, employees, and business owners. 프리랜서, 직장인, 사업자를 위한 세금 계산기. Calculate Korean income tax and US 1099 taxes in 5 seconds.",
  alternates: {
    languages: {
      ko: "/kr",
      en: "/us",
      "x-default": "/",
    },
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
        CalcHub
      </h1>
      <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-400">
        Smart Tax Calculators
        <br />
        세금 계산, 5초면 충분합니다
      </p>

      {/* Country Selection */}
      <div className="mt-12 grid w-full max-w-lg gap-6 sm:grid-cols-2">
        <Link
          href="/kr"
          className="group flex flex-col items-center rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all hover:border-blue-400 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:hover:border-dark-blue"
        >
          <span className="text-5xl">🇰🇷</span>
          <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-dark-blue">
            한국
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            세금 계산기
          </p>
          <p className="mt-1 text-center text-xs text-gray-400 dark:text-gray-500">
            종합소득세 · 근로소득세 · 부가가치세 · 퇴직금
          </p>
        </Link>

        <Link
          href="/us"
          className="group flex flex-col items-center rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all hover:border-blue-400 hover:shadow-lg dark:border-dark-border dark:bg-dark-card dark:hover:border-dark-blue"
        >
          <span className="text-5xl">🇺🇸</span>
          <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-dark-blue">
            United States
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Tax Calculators
          </p>
          <p className="mt-1 text-center text-xs text-gray-400 dark:text-gray-500">
            1099 · W-2 vs 1099 · Home Office · Mileage
          </p>
        </Link>
      </div>

      {/* Trust Signals */}
      <div className="mt-16 grid grid-cols-3 gap-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2026</p>
          <p>Latest Tax Law</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">5s</p>
          <p>Instant Results</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
          <p>Free</p>
        </div>
      </div>
    </main>
  );
}
