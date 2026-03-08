import Link from "next/link";
import type { Metadata } from "next";
import krPages from "@/config/longtail/kr-pages.json";

export const metadata: Metadata = {
  title: "프리랜서 세금 계산기 — CalcHub",
  description:
    "프리랜서와 N잡러를 위한 종합소득세 계산기. 3.3% 환급액, 유효세율, 절세 팁을 5초 만에 확인하세요. 2026년 세법 기준.",
  alternates: {
    languages: {
      ko: "/kr",
      en: "/us",
      "x-default": "/",
    },
  },
};

export default function KrHomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          프리랜서 세금,
          <br className="sm:hidden" /> 5초 만에 계산하세요
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          3.3% 원천징수 기반 종합소득세 환급액을 간편하게 계산하고,
          <br />
          맞춤 절세 인사이트를 받아보세요.
        </p>
        <Link
          href="/kr/freelancer-tax-calculator"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          세금 계산하기
        </Link>
      </section>

      {/* Trust Signals */}
      <section className="mt-16 text-center">
        <div className="grid grid-cols-3 gap-8 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2026</p>
            <p>최신 세법 기준</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">5초</p>
            <p>즉시 계산 결과</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
            <p>무료 이용</p>
          </div>
        </div>
      </section>

      {/* Longtail Link Grid */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          직군별 · 소득별 세금 계산기
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {krPages.map(
            (page: { slug: string; h1: string; description: string }) => (
              <Link
                key={page.slug}
                href={`/kr/${page.slug}`}
                className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-sm dark:border-gray-700 dark:hover:border-blue-500"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {page.h1}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {page.description}
                </p>
              </Link>
            )
          )}
        </div>
      </section>
    </main>
  );
}
