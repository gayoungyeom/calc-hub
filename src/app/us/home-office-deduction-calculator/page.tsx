import type { Metadata } from "next";
import HomeOfficeCalculator from "@/components/us/home-office/HomeOfficeCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";

const mainFaq = [
  {
    question: "Who qualifies for the home office deduction?",
    answer: "You must use a specific area of your home regularly and exclusively for business. It must be your principal place of business, or a place where you regularly meet clients. W-2 employees generally cannot claim this deduction — it's primarily for self-employed individuals and independent contractors.",
  },
  {
    question: "What's the difference between Simplified and Regular methods?",
    answer: "The Simplified Method allows $5 per square foot of your home office (max 300 sq ft = $1,500). The Regular Method calculates actual expenses (rent, utilities, insurance, repairs) proportional to your office space. The Regular Method often yields a higher deduction but requires detailed record-keeping.",
  },
  {
    question: "Can I switch between Simplified and Regular methods each year?",
    answer: "Yes, you can choose whichever method gives you the better deduction each year. You're not locked into one method. However, if you switch from Regular to Simplified, you cannot claim depreciation for that year.",
  },
  {
    question: "Does a home office deduction increase my audit risk?",
    answer: "The home office deduction used to be a red flag, but with the rise of remote work, it's become much more common. As long as you meet the 'regular and exclusive use' requirement and keep good records, the deduction is perfectly legitimate.",
  },
  {
    question: "What expenses can I deduct with the Regular Method?",
    answer: "Deductible expenses include: rent or mortgage interest, property taxes, utilities (electricity, gas, water, internet), home insurance, repairs and maintenance, depreciation (for homeowners), and security system costs. All are prorated by your business-use percentage.",
  },
];

export const metadata: Metadata = {
  title: "Home Office Deduction Calculator 2026 — CalcHub",
  description:
    "Calculate your home office tax deduction. Compare Simplified ($5/sqft) vs Regular Method and find which saves you more. Free calculator for self-employed.",
  keywords: [
    "home office deduction calculator",
    "home office tax deduction",
    "simplified method home office",
    "work from home tax deduction",
    "home office expenses",
  ],
  alternates: {
    languages: {
      en: "/us/home-office-deduction-calculator",
      ko: "/kr/freelancer-tax-calculator",
      "x-default": "/",
    },
  },
};

export default function HomeOfficeDeductionCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Home Office Deduction Calculator
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Compare the Simplified Method vs Regular Method for your home office
          deduction. Find which approach saves you the most on taxes.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026 Tax Year</p>
      </div>

      <HomeOfficeCalculator />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Related Tax Calculators
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink href="/us/1099-tax-calculator" label="1099 Self-Employed Tax Calculator" from="home-office-deduction-calculator" />
          </li>
          <li>
            <RelatedLink href="/us/mileage-deduction-calculator" label="Mileage Deduction Calculator" from="home-office-deduction-calculator" />
          </li>
          <li>
            <RelatedLink href="/us/w2-vs-1099-calculator" label="W-2 vs 1099 Comparison Calculator" from="home-office-deduction-calculator" />
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
          { label: "IRS Publication 587 — Business Use of Your Home", url: "https://www.irs.gov/publications/p587" },
          { label: "IRS Form 8829 — Expenses for Business Use of Your Home", url: "https://www.irs.gov/forms-pubs/about-form-8829" },
        ]}
        calculationMethod="Simplified: $5 × office sq ft (max 300) | Regular: total home expenses × (office sq ft ÷ total home sq ft)"
      />
    </main>
  );
}
