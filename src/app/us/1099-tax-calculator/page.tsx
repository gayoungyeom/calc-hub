import type { Metadata } from "next";
import UsCalculator from "@/components/us/UsCalculator";

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
    </main>
  );
}
