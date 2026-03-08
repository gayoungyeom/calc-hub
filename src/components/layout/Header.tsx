import Link from "next/link";
import type { Locale } from "@/lib/locale";
import DarkModeToggle from "./DarkModeToggle";

interface Props {
  locale?: Locale;
}

export default function Header({ locale = "en" }: Props) {
  const isKo = locale === "ko";

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={isKo ? "/kr" : "/us"}
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          CalcHub
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          {isKo ? (
            <>
              <Link
                href="/kr/freelancer-tax-calculator"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                종합소득세 계산기
              </Link>
              <Link
                href="/us"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                US Calculator
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/us/1099-tax-calculator"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                1099 Tax Calculator
              </Link>
              <Link
                href="/kr"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                KR 계산기
              </Link>
            </>
          )}
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}
