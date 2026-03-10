"use client";

import { useState } from "react";
import type { MileageInput } from "@/engine/us/mileage";

interface Props {
  onCalculate: (input: MileageInput) => void;
}

export default function MileageForm({ onCalculate }: Props) {
  const [annualMiles, setAnnualMiles] = useState("");
  const [businessUsePercentage, setBusinessUsePercentage] = useState("100");
  const [actualGasExpense, setActualGasExpense] = useState("");
  const [actualInsurance, setActualInsurance] = useState("");
  const [actualRepairs, setActualRepairs] = useState("");
  const [actualDepreciation, setActualDepreciation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const miles = parseNumber(annualMiles);
    if (miles <= 0) return;

    onCalculate({
      annualMiles: miles,
      businessUsePercentage: parseInt(businessUsePercentage) || 100,
      actualGasExpense: parseNumber(actualGasExpense),
      actualInsurance: parseNumber(actualInsurance),
      actualRepairs: parseNumber(actualRepairs),
      actualDepreciation: parseNumber(actualDepreciation),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="annualMiles" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Annual Business Miles
        </label>
        <input
          id="annualMiles"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 15,000"
          value={annualMiles}
          onChange={(e) => setAnnualMiles(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Miles driven for business purposes only (not commuting)</p>
      </div>

      {/* Standard mileage preview */}
      {annualMiles && (
        <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:bg-dark-blue/15 dark:text-dark-blue">
          Standard Mileage Deduction: <strong>${formatNumber(parseNumber(annualMiles) * 0.67)}</strong> ({parseNumber(annualMiles).toLocaleString()} mi × $0.67)
        </div>
      )}

      <div>
        <label htmlFor="businessUsePercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Business Use Percentage
        </label>
        <select
          id="businessUsePercentage"
          value={businessUsePercentage}
          onChange={(e) => setBusinessUsePercentage(e.target.value)}
          className="custom-select mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10].map((n) => (
            <option key={n} value={n}>{n}%</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">For actual expense method only — % of vehicle used for business</p>
      </div>

      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          Actual Vehicle Expenses (for comparison) ▾
        </summary>
        <div className="mt-3 space-y-4 pl-1">
          <div>
            <label htmlFor="gas" className="block text-sm text-gray-600 dark:text-gray-400">Gas & Fuel ($)</label>
            <input id="gas" type="text" inputMode="numeric" placeholder="0" value={actualGasExpense}
              onChange={(e) => setActualGasExpense(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500" />
          </div>
          <div>
            <label htmlFor="ins" className="block text-sm text-gray-600 dark:text-gray-400">Auto Insurance ($)</label>
            <input id="ins" type="text" inputMode="numeric" placeholder="0" value={actualInsurance}
              onChange={(e) => setActualInsurance(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500" />
          </div>
          <div>
            <label htmlFor="repairs" className="block text-sm text-gray-600 dark:text-gray-400">Repairs & Maintenance ($)</label>
            <input id="repairs" type="text" inputMode="numeric" placeholder="0" value={actualRepairs}
              onChange={(e) => setActualRepairs(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500" />
          </div>
          <div>
            <label htmlFor="dep" className="block text-sm text-gray-600 dark:text-gray-400">Depreciation / Lease Payments ($)</label>
            <input id="dep" type="text" inputMode="numeric" placeholder="0" value={actualDepreciation}
              onChange={(e) => setActualDepreciation(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500" />
          </div>
        </div>
      </details>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
      >
        Calculate Deduction
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

function formatNumber(value: number): string {
  return Math.round(value).toLocaleString();
}
