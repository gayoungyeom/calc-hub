import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — CalcHub",
  description:
    "CalcHub is a free tax calculator platform for freelancers, employees, and business owners. We provide accurate calculations based on official tax codes with transparent data sources.",
};

export default function UsAboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        About CalcHub
      </h1>

      <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          CalcHub is a free tax calculator platform designed to help freelancers,
          gig workers, employees, and self-employed individuals easily calculate
          their taxes.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          Our Mission
        </h2>
        <p>
          Tax calculations are complex, and tools like the IRS website are not
          intuitive. CalcHub provides not only accurate calculation results but
          also tax-saving tips and insights to help users make better financial
          decisions.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          Expertise &amp; Trustworthiness
        </h2>
        <p>
          The CalcHub team continuously researches US and Korean tax codes,
          directly analyzing official tax law documents to build our calculation
          engines. All calculation logic is grounded in published tax statutes
          and official guidelines, and we promptly update our engines when tax
          laws change.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          Accuracy
        </h2>
        <p>
          All calculations are based on official tax laws of each country. For
          the US, we reference IRS Publication 334 and Schedule SE. For Korea, we
          reference the National Tax Service income tax rate tables. We update
          promptly when tax laws change.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          Data Sources
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong>US:</strong> IRS Revenue Procedure 2025-11, IRS Publication
            334, Schedule SE, State Tax Agency official data
          </li>
          <li>
            <strong>Korea:</strong> National Tax Service income tax rate tables
            (2026), Income Tax Act Enforcement Decree
          </li>
          <li>
            All config data is transparently available on our{" "}
            <a
              href="https://github.com/gayoungyeom/calc-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              GitHub repository
            </a>
            .
          </li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-8">
          Disclaimer
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          All calculation results provided by CalcHub are for reference only and
          have no legal effect. Please consult a qualified tax professional or
          CPA for accurate tax filing. CalcHub is not responsible for any damages
          resulting from errors in calculation results.
        </p>
      </div>
    </main>
  );
}
