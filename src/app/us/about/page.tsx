import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — CalcHub",
  description:
    "CalcHub is a free tax calculator platform for freelancers and self-employed individuals.",
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
          gig workers, and self-employed individuals easily calculate their
          taxes.
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
          Accuracy
        </h2>
        <p>
          All calculations are based on official tax laws of each country. For
          the US, we reference IRS Publication 334 and Schedule SE. For Korea, we
          reference the National Tax Service income tax rate tables. We update
          promptly when tax laws change.
        </p>

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
