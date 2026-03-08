import Link from "next/link";
import type { Locale } from "@/lib/locale";

interface Props {
  locale?: Locale;
}

export default function Footer({ locale = "en" }: Props) {
  const currentYear = new Date().getFullYear();
  const isKo = locale === "ko";

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} CalcHub. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-200">
              About
            </Link>
            <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-200">
              Terms of Service
            </Link>
            {isKo ? (
              <>
                <Link
                  href="/kr/freelancer-tax-calculator"
                  className="hover:text-gray-700 dark:hover:text-gray-200"
                >
                  KR 계산기
                </Link>
                <Link
                  href="/us"
                  className="hover:text-gray-700 dark:hover:text-gray-200"
                >
                  US Calculator
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/us/1099-tax-calculator"
                  className="hover:text-gray-700 dark:hover:text-gray-200"
                >
                  US Calculator
                </Link>
                <Link
                  href="/kr"
                  className="hover:text-gray-700 dark:hover:text-gray-200"
                >
                  KR 계산기
                </Link>
              </>
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          {isKo
            ? "본 사이트의 계산 결과는 참고용이며, 정확한 세무 상담은 전문가에게 문의하세요."
            : "All calculations are for reference only. Please consult a qualified tax professional for accurate tax filing."}
        </p>
      </div>
    </footer>
  );
}
