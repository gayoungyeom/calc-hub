"use client";

import { useState } from "react";
import type { UsCalculatorInput, UsFilingStatus } from "@/engine/types";

interface Props {
  onCalculate: (input: UsCalculatorInput) => void;
  defaultState?: string;
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

export default function UsCalculatorForm({ onCalculate, defaultState }: Props) {
  const [grossIncome, setGrossIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [filingStatus, setFilingStatus] = useState<UsFilingStatus>("single");
  const [state, setState] = useState(defaultState ?? "CA");
  const [deductionType, setDeductionType] = useState<"standard" | "itemized">("standard");
  const [itemizedDeduction, setItemizedDeduction] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseNumber(grossIncome);
    if (income <= 0) return;

    onCalculate({
      grossIncome: income,
      expenses: parseNumber(expenses),
      filingStatus,
      state,
      deductionType,
      itemizedDeduction:
        deductionType === "itemized" ? parseNumber(itemizedDeduction) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Annual Gross Income */}
      <div>
        <label htmlFor="grossIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Annual Gross Income ($)
        </label>
        <input
          id="grossIncome"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 100,000"
          value={grossIncome}
          onChange={(e) => setGrossIncome(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Your total 1099 income before expenses</p>
      </div>

      {/* Business Expenses */}
      <div>
        <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Business Expenses ($)
        </label>
        <input
          id="expenses"
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={expenses}
          onChange={(e) => setExpenses(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {/* Filing Status */}
      <div>
        <label htmlFor="filingStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value as UsFilingStatus)}
          className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {FILING_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          State
        </label>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Deduction Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deduction Type</label>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="deductionType"
              value="standard"
              checked={deductionType === "standard"}
              onChange={() => setDeductionType("standard")}
              className="cursor-pointer text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Standard</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="deductionType"
              value="itemized"
              checked={deductionType === "itemized"}
              onChange={() => setDeductionType("itemized")}
              className="cursor-pointer text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Itemized</span>
          </label>
        </div>
      </div>

      {/* Itemized Amount */}
      {deductionType === "itemized" && (
        <div>
          <label htmlFor="itemizedDeduction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Itemized Deduction Amount ($)
          </label>
          <input
            id="itemizedDeduction"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={itemizedDeduction}
            onChange={(e) => setItemizedDeduction(formatNumberInput(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
      >
        Calculate Tax
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
