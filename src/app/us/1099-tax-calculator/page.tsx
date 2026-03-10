import type { Metadata } from "next";
import UsCalculator from "@/components/us/UsCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";
import usPages from "@/config/longtail/us-pages.json";

const mainFaq = [
  {
    question: "What is self-employment tax?",
    answer: "Self-employment (SE) tax covers Social Security (12.4%) and Medicare (2.9%) taxes, totaling 15.3% of net earnings. As a W-2 employee, your employer pays half — but as a 1099 contractor, you pay the full amount. The good news: you can deduct half of SE tax from your income.",
  },
  {
    question: "When are quarterly estimated tax payments due?",
    answer: "For 2026, quarterly payments are due: Q1 (April 15), Q2 (June 15), Q3 (September 15), and Q4 (January 15, 2027). If you expect to owe $1,000+ in taxes, you should make quarterly payments to avoid underpayment penalties.",
  },
  {
    question: "What's the difference between 1099-NEC and 1099-K?",
    answer: "1099-NEC reports non-employee compensation (freelance/contract payments of $600+). 1099-K reports payment card and third-party network transactions (PayPal, Venmo, etc.) over $600. Both report taxable income, but they come from different sources.",
  },
  {
    question: "How can I reduce my self-employment tax?",
    answer: "Top strategies: 1) Deduct all legitimate business expenses to reduce net income, 2) Contribute to a SEP IRA or Solo 401(k), 3) Consider S-Corp election if earning $80K+ to split income between salary and distributions, 4) Claim the home office deduction if eligible.",
  },
  {
    question: "Do I need to file taxes if I made less than $400?",
    answer: "If your net self-employment income is under $400, you don't owe self-employment tax. However, you may still need to file a federal return if your total income exceeds the standard deduction threshold ($15,000 for single filers in 2026).",
  },
];

export const metadata: Metadata = {
  title: "1099 Self-Employed Tax Calculator 2026 — CalcHub",
  description:
    "Free 1099 tax calculator for freelancers and self-employed. Calculate federal, self-employment, and state taxes. Get quarterly estimated payments instantly.",
  keywords: [
    "1099 tax calculator",
    "self employed tax calculator",
    "quarterly estimated tax calculator",
    "freelance tax calculator 2026",
    "self employment tax",
  ],
  alternates: {
    languages: {
      en: "/us/1099-tax-calculator",
      ko: "/kr/freelancer-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function Us1099TaxCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          1099 Self-Employed Tax Calculator
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Calculate your federal, self-employment, and state taxes as a 1099
          contractor. See your quarterly estimated payments and tax-saving
          insights.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026 Tax Year</p>
      </div>

      <UsCalculator />

      {/* Related calculators */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Related Tax Calculators
        </h2>
        <ul className="mt-4 space-y-2">
          {usPages.slice(0, 6).map((p) => (
            <li key={p.slug}>
              <RelatedLink
                href={`/us/${p.slug}`}
                label={p.h1}
                from="1099-tax-calculator"
              />
            </li>
          ))}
        </ul>
      </section>

      <FaqSection title="Frequently Asked Questions" items={mainFaq} />
      <FaqSchema items={mainFaq} />

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-01-10"
        locale="en"
        sources={[
          {
            label: "IRS Publication 334 — Tax Guide for Small Business",
            url: "https://www.irs.gov/publications/p334",
          },
          {
            label: "IRS Schedule SE — Self-Employment Tax",
            url: "https://www.irs.gov/forms-pubs/about-schedule-se-form-1040",
          },
          {
            label: "California FTB — Tax Rates",
            url: "https://www.ftb.ca.gov",
          },
          {
            label: "New York State Tax — Income Tax Rates",
            url: "https://www.tax.ny.gov",
          },
        ]}
        calculationMethod="Gross Income → Business Expenses → Net Business Income → SE Tax (92.35% × 15.3%) → AGI → Deduction → Federal Tax (progressive brackets) → State Tax"
      />
    </main>
  );
}
