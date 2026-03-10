"use client";

import { useState } from "react";
import type { UsFilingStatus } from "@/engine/types";
import type { W2vs1099Input } from "@/engine/us/w2-vs-1099";

interface Props {
  onCalculate: (input: W2vs1099Input) => void;
}

const FILING_STATUSES: { value: UsFilingStatus; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "married_jointly", label: "Married Filing Jointly" },
  { value: "head_of_household", label: "Head of Household" },
];

const STATES = [
  { value: "CA", label: "California" },
  { value: "FL", label: "Florida" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "WA", label: "Washington" },
];

export default function W2vs1099Form({ onCalculate }: Props) {
  const [annualIncome, setAnnualIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState<UsFilingStatus>("single");
  const [state, setState] = useState("CA");
  const [businessExpenses, setBusinessExpenses] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseNumber(annualIncome);
    if (income <= 0) return;

    onCalculate({
      annualIncome: income,
      filingStatus,
      state,
      businessExpenses: parseNumber(businessExpenses),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Annual Income ($)
        </label>
        <input
          id="annualIncome"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 100,000"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Same income amount will be compared as W-2 salary vs 1099 income</p>
      </div>

      <div>
        <label htmlFor="filingStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value as UsFilingStatus)}
          className="custom-select mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {FILING_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          State
        </label>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="custom-select mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {STATES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="businessExpenses" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Business Expenses — 1099 only ($)
        </label>
        <input
          id="businessExpenses"
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={businessExpenses}
          onChange={(e) => setBusinessExpenses(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Deductible business expenses (only applies to 1099)</p>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
      >
        Compare W-2 vs 1099
      </button>
    </form>
  );
}

function parseNumber(value: string): number {
  return parseInt(value.replace(/,/g, ""), 10) || 0;
}

function formatNumberInput(value: string): string {
  const num = value.replace(/[^0-9]/g, "");
  if (!num) return "";
  return parseInt(num, 10).toLocaleString();
}
