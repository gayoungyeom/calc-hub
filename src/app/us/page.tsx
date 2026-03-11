import Link from "next/link";
import type { Metadata } from "next";
import usPages from "@/config/longtail/us-pages.json";

export const metadata: Metadata = {
  title: "Tax Calculators for Self-Employed — CalcHub",
  description:
    "Free tax calculators for freelancers and self-employed. 1099 taxes, W-2 vs 1099 comparison, home office and mileage deductions. Get instant results. 2026 tax year.",
  alternates: {
    languages: {
      ko: "/kr",
      en: "/us",
      "x-default": "/",
    },
  },
};

export default function UsHomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Tax Calculators
          <br className="sm:hidden" /> for Self-Employed
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          1099, deductions, and comparisons — all in one place.
          <br />
          Get instant results and tax-saving insights.
        </p>
        <Link
          href="/us/1099-tax-calculator"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
        >
          Calculate Tax
        </Link>
      </section>

      {/* Trust Signals */}
      <section className="mt-16 text-center">
        <div className="grid grid-cols-3 gap-8 text-sm text-gray-500 dark:text-gray-400">
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
      </section>

      {/* Tax Calculators */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Tax Calculators
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { href: "/us/1099-tax-calculator", title: "1099 Tax Calculator", desc: "Federal, SE, and state taxes for freelancers and contractors" },
            { href: "/us/w2-vs-1099-calculator", title: "W-2 vs 1099 Calculator", desc: "Compare take-home pay as employee vs independent contractor" },
            { href: "/us/home-office-deduction-calculator", title: "Home Office Deduction", desc: "Simplified vs Regular method — find which saves more" },
            { href: "/us/mileage-deduction-calculator", title: "Mileage Deduction", desc: "Standard Mileage Rate vs Actual Expenses comparison" },
          ].map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-sm dark:border-dark-border dark:hover:border-dark-blue"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {calc.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {calc.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* By Profession */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Tax Calculators by Profession
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {usPages
            .filter((page: { slug: string }) => !page.slug.endsWith("-1099-tax") && !page.slug.match(/^\d+k-/))
            .map(
              (page: { slug: string; h1: string; description: string }) => (
                <Link
                  key={page.slug}
                  href={`/us/${page.slug}`}
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-sm dark:border-dark-border dark:hover:border-dark-blue"
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

      {/* By State */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Tax Calculators by State
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {usPages
            .filter((page: { slug: string }) => page.slug.endsWith("-1099-tax"))
            .map(
              (page: { slug: string; h1: string; description: string }) => (
                <Link
                  key={page.slug}
                  href={`/us/${page.slug}`}
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-sm dark:border-dark-border dark:hover:border-dark-blue"
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

      {/* By Income */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Tax Calculators by Income
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {usPages
            .filter((page: { slug: string }) => page.slug.match(/^\d+k-/))
            .map(
              (page: { slug: string; h1: string; description: string }) => (
                <Link
                  key={page.slug}
                  href={`/us/${page.slug}`}
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-sm dark:border-dark-border dark:hover:border-dark-blue"
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
