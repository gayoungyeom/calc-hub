import type { Metadata } from "next";
import MileageCalculator from "@/components/us/mileage/MileageCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";

const mainFaq = [
  {
    question: "What is the 2026 IRS standard mileage rate?",
    answer: "The IRS standard mileage rate for business use of a vehicle is $0.67 per mile for 2026. This rate covers gas, insurance, depreciation, repairs, and other vehicle operating costs. You simply multiply your business miles by this rate to calculate your deduction.",
  },
  {
    question: "What counts as deductible business mileage?",
    answer: "Business mileage includes driving to meet clients, traveling between work locations, going to the bank or post office for business, and trips to buy supplies. It does NOT include commuting from home to your regular workplace, or personal errands.",
  },
  {
    question: "Can I switch between Standard Mileage and Actual Expenses?",
    answer: "If you use the standard mileage rate in the first year you use the car for business, you can switch to actual expenses in later years. However, if you start with actual expenses, you generally cannot switch to standard mileage for that same vehicle.",
  },
  {
    question: "How do I track my mileage for tax purposes?",
    answer: "Keep a mileage log that records: date, destination, business purpose, and miles driven. Apps like MileIQ, Everlance, or Stride make tracking easy. The IRS requires contemporaneous records — logging at the time of the trip, not reconstructing later.",
  },
  {
    question: "Can rideshare drivers (Uber/Lyft) use the standard mileage rate?",
    answer: "Yes! Rideshare drivers can use the standard mileage rate for all business miles, including miles driven while waiting for rides (if the app is on), driving to pick up passengers, and driving passengers. Only personal miles are excluded.",
  },
];

export const metadata: Metadata = {
  title: "Mileage Deduction Calculator 2026 — CalcHub",
  description:
    "Calculate your mileage tax deduction. Compare IRS Standard Mileage Rate ($0.67/mile) vs Actual Expenses method. Free calculator for self-employed and gig workers.",
  keywords: [
    "mileage deduction calculator",
    "IRS mileage rate 2026",
    "standard mileage rate",
    "business mileage deduction",
    "mileage tax deduction",
    "actual expenses vs standard mileage",
  ],
  alternates: {
    languages: {
      en: "/us/mileage-deduction-calculator",
      ko: "/kr/freelancer-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function MileageDeductionCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Mileage Deduction Calculator
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Compare the IRS Standard Mileage Rate vs Actual Expenses method.
          Find which approach maximizes your vehicle tax deduction.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026 Tax Year — $0.67/mile</p>
      </div>

      <MileageCalculator />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Related Tax Calculators
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink href="/us/1099-tax-calculator" label="1099 Self-Employed Tax Calculator" from="mileage-deduction-calculator" />
          </li>
          <li>
            <RelatedLink href="/us/home-office-deduction-calculator" label="Home Office Deduction Calculator" from="mileage-deduction-calculator" />
          </li>
          <li>
            <RelatedLink href="/us/w2-vs-1099-calculator" label="W-2 vs 1099 Comparison Calculator" from="mileage-deduction-calculator" />
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
          { label: "IRS Standard Mileage Rates", url: "https://www.irs.gov/tax-professionals/standard-mileage-rates" },
          { label: "IRS Publication 463 — Travel, Gift, and Car Expenses", url: "https://www.irs.gov/publications/p463" },
        ]}
        calculationMethod="Standard: business miles × $0.67 | Actual: (gas + insurance + repairs + depreciation) × business use %"
      />
    </main>
  );
}
