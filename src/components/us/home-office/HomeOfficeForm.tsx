"use client";

import { useState } from "react";
import type { HomeOfficeInput } from "@/engine/us/home-office";

interface Props {
  onCalculate: (input: HomeOfficeInput) => void;
}

export default function HomeOfficeForm({ onCalculate }: Props) {
  const [totalHomeSqft, setTotalHomeSqft] = useState("");
  const [officeSqft, setOfficeSqft] = useState("");
  const [annualRentOrMortgage, setAnnualRentOrMortgage] = useState("");
  const [annualUtilities, setAnnualUtilities] = useState("");
  const [annualInsurance, setAnnualInsurance] = useState("");
  const [annualRepairs, setAnnualRepairs] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const homeSqft = parseNumber(totalHomeSqft);
    const offSqft = parseNumber(officeSqft);
    if (homeSqft <= 0 || offSqft <= 0) return;

    onCalculate({
      totalHomeSqft: homeSqft,
      officeSqft: offSqft,
      annualRentOrMortgage: parseNumber(annualRentOrMortgage),
      annualUtilities: parseNumber(annualUtilities),
      annualInsurance: parseNumber(annualInsurance),
      annualRepairs: parseNumber(annualRepairs),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="totalHomeSqft" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Home (sq ft)
          </label>
          <input
            id="totalHomeSqft"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 1,200"
            value={totalHomeSqft}
            onChange={(e) => setTotalHomeSqft(formatNumberInput(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            required
          />
        </div>
        <div>
          <label htmlFor="officeSqft" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Office Space (sq ft)
          </label>
          <input
            id="officeSqft"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 150"
            value={officeSqft}
            onChange={(e) => setOfficeSqft(formatNumberInput(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="rent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Annual Rent or Mortgage Interest ($)
        </label>
        <input
          id="rent"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 24,000"
          value={annualRentOrMortgage}
          onChange={(e) => setAnnualRentOrMortgage(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">For homeowners, enter mortgage interest only (not principal)</p>
      </div>

      <div>
        <label htmlFor="utilities" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Annual Utilities ($)
        </label>
        <input
          id="utilities"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 3,600"
          value={annualUtilities}
          onChange={(e) => setAnnualUtilities(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Electricity, gas, water, internet, phone</p>
      </div>

      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          Insurance & Repairs (optional) ▾
        </summary>
        <div className="mt-3 space-y-4 pl-1">
          <div>
            <label htmlFor="insurance" className="block text-sm text-gray-600 dark:text-gray-400">
              Annual Home Insurance ($)
            </label>
            <input
              id="insurance"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={annualInsurance}
              onChange={(e) => setAnnualInsurance(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="repairs" className="block text-sm text-gray-600 dark:text-gray-400">
              Annual Repairs & Maintenance ($)
            </label>
            <input
              id="repairs"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={annualRepairs}
              onChange={(e) => setAnnualRepairs(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            />
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
