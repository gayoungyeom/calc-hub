import Link from "next/link";
import type { Locale } from "@/lib/locale";

interface Props {
  locale?: Locale;
}

export default function Footer({ locale = "en" }: Props) {
  const currentYear = new Date().getFullYear();
  const isKo = locale === "ko";
  const prefix = isKo ? "/kr" : "/us";

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16 dark:border-dark-border dark:bg-dark-surface">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} CalcHub. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href={`${prefix}/about`} className="hover:text-gray-700 dark:hover:text-gray-200">
              {isKo ? "소개" : "About"}
            </Link>
            <Link href={`${prefix}/privacy`} className="hover:text-gray-700 dark:hover:text-gray-200">
              {isKo ? "개인정보처리방침" : "Privacy Policy"}
            </Link>
            <Link href={`${prefix}/terms`} className="hover:text-gray-700 dark:hover:text-gray-200">
              {isKo ? "이용약관" : "Terms of Service"}
            </Link>
            {isKo ? (
              <Link
                href="/us"
                className="hover:text-gray-700 dark:hover:text-gray-200"
              >
                미국 세금 계산기
              </Link>
            ) : (
              <Link
                href="/kr"
                className="hover:text-gray-700 dark:hover:text-gray-200"
              >
                Korean Tax Calculator
              </Link>
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
