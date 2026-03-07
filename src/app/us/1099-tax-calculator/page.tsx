import type { Metadata } from "next";
import UsCalculator from "@/components/us/UsCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";

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
};

export default function Us1099TaxCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          1099 Self-Employed Tax Calculator
        </h1>
        <p className="mt-2 text-gray-600">
          Calculate your federal, self-employment, and state taxes as a 1099
          contractor. See your quarterly estimated payments and tax-saving
          insights.
        </p>
        <p className="mt-1 text-sm text-gray-400">2026 Tax Year</p>
      </div>

      <UsCalculator />

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-01-10"
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
