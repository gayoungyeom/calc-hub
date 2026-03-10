"use client";

import { useState } from "react";
import type { KrSeveranceInput } from "@/engine/kr/severance";

interface Props {
  onCalculate: (input: KrSeveranceInput) => void;
}

export default function KrSeveranceForm({ onCalculate }: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monthlyBaseSalary, setMonthlyBaseSalary] = useState("");
  const [annualBonus, setAnnualBonus] = useState("");
  const [annualLeavePay, setAnnualLeavePay] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    const salary = parseNumber(monthlyBaseSalary);
    if (salary <= 0) return;

    onCalculate({
      startDate,
      endDate,
      monthlyBaseSalary: salary,
      annualBonus: parseNumber(annualBonus),
      annualLeavePay: parseNumber(annualLeavePay),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 입사일 */}
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          입사일
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
          required
        />
      </div>

      {/* 퇴사일 */}
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          퇴사일 (퇴직 예정일)
        </label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
          required
        />
      </div>

      {/* 월 기본급 */}
      <div>
        <label htmlFor="monthlyBaseSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          월 기본급 (원)
        </label>
        <input
          id="monthlyBaseSalary"
          type="text"
          inputMode="numeric"
          placeholder="예: 3,000,000"
          value={monthlyBaseSalary}
          onChange={(e) => setMonthlyBaseSalary(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">퇴직 전 3개월간의 월 기본급</p>
      </div>

      {/* 상여금·연차수당 */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          상여금 · 연차수당 (선택) ▾
        </summary>
        <div className="mt-3 space-y-4 pl-1">
          <div>
            <label htmlFor="annualBonus" className="block text-sm text-gray-600 dark:text-gray-400">
              연간 상여금 총액 (원)
            </label>
            <input
              id="annualBonus"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={annualBonus}
              onChange={(e) => setAnnualBonus(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">설·추석 상여, 성과급 등 연간 총액</p>
          </div>
          <div>
            <label htmlFor="annualLeavePay" className="block text-sm text-gray-600 dark:text-gray-400">
              연차수당 (원)
            </label>
            <input
              id="annualLeavePay"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={annualLeavePay}
              onChange={(e) => setAnnualLeavePay(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">미사용 연차에 대한 수당</p>
          </div>
        </div>
      </details>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
      >
        퇴직금 계산하기
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
