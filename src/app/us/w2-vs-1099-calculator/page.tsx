import type { Metadata } from "next";
import W2vs1099Calculator from "@/components/us/w2-vs-1099/W2vs1099Calculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";

const mainFaq = [
  {
    question: "Why do 1099 contractors pay more in taxes than W-2 employees?",
    answer: "As a 1099 contractor, you pay both the employer and employee portions of FICA taxes (Social Security + Medicare), totaling 15.3% as self-employment tax. W-2 employees only pay the employee portion (7.65%), with their employer covering the other half. This difference alone can add 7.65% to your tax burden.",
  },
  {
    question: "Can 1099 contractors reduce their tax burden below W-2 levels?",
    answer: "Yes, through business deductions. 1099 contractors can deduct business expenses (home office, equipment, mileage, health insurance premiums, retirement contributions) that W-2 employees cannot. With enough legitimate deductions, a 1099 contractor's effective tax rate can match or beat a W-2 employee's.",
  },
  {
    question: "Should I ask for a higher rate as a 1099 contractor?",
    answer: "Absolutely. A common rule of thumb is to charge 25-30% more as a 1099 contractor to account for self-employment tax, lack of benefits (health insurance, PTO, retirement matching), and business expenses. For example, a $100K W-2 salary is roughly equivalent to a $130K-$140K 1099 rate.",
  },
  {
    question: "What benefits do W-2 employees get that 1099 contractors don't?",
    answer: "W-2 employees typically receive: employer-paid portion of FICA (7.65%), health insurance subsidies, paid time off (PTO), 401(k) matching, unemployment insurance, workers' compensation, and disability insurance. These benefits can add 20-40% to base salary value.",
  },
  {
    question: "Is it legal for a company to classify me as 1099 instead of W-2?",
    answer: "It depends on the working relationship. The IRS uses three categories to determine classification: behavioral control, financial control, and type of relationship. If the company controls when, where, and how you work, you may legally be an employee. Misclassification can result in penalties for the company.",
  },
];

export const metadata: Metadata = {
  title: "W-2 vs 1099 Tax Comparison Calculator 2026 — CalcHub",
  description:
    "Compare W-2 employee vs 1099 contractor taxes side by side. See the real take-home pay difference, self-employment tax impact, and break-even rate.",
  keywords: [
    "W-2 vs 1099 calculator",
    "W-2 vs 1099 comparison",
    "employee vs contractor tax",
    "1099 vs W-2 take home pay",
    "self employment tax comparison",
  ],
  alternates: {
    languages: {
      en: "/us/w2-vs-1099-calculator",
      ko: "/kr/earned-income-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function W2vs1099CalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          W-2 vs 1099 Tax Comparison Calculator
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Compare your take-home pay as a W-2 employee vs 1099 contractor.
          See the real tax difference and find your break-even rate.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026 Tax Year</p>
      </div>

      <W2vs1099Calculator />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Related Tax Calculators
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink
              href="/us/1099-tax-calculator"
              label="1099 Self-Employed Tax Calculator"
              from="w2-vs-1099-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/us/home-office-deduction-calculator"
              label="Home Office Deduction Calculator"
              from="w2-vs-1099-calculator"
            />
          </li>
          <li>
            <RelatedLink
              href="/us/mileage-deduction-calculator"
              label="Mileage Deduction Calculator"
              from="w2-vs-1099-calculator"
            />
          </li>
        </ul>
      </section>

      <FaqSection title="Frequently Asked Questions" items={mainFaq} />
      <FaqSchema items={mainFaq} />

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-03-08"
        locale="en"
        sources={[
          { label: "IRS — Employee vs Independent Contractor", url: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" },
          { label: "IRS Schedule SE — Self-Employment Tax", url: "https://www.irs.gov/forms-pubs/about-schedule-se-form-1040" },
        ]}
        calculationMethod="W-2: FICA (7.65%) + Federal Tax + State Tax | 1099: SE Tax (15.3%) + Federal Tax + State Tax - Business Deductions"
      />
    </main>
  );
}
