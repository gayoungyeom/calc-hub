"use client";

import { useState } from "react";
import type { KrEarnedIncomeInput } from "@/engine/kr/earned-income-tax";

interface Props {
  onCalculate: (input: KrEarnedIncomeInput) => void;
}

export default function KrEarnedIncomeForm({ onCalculate }: Props) {
  const [annualSalary, setAnnualSalary] = useState("");
  const [nonTaxableIncome, setNonTaxableIncome] = useState("");
  const [dependents, setDependents] = useState("1");
  const [childrenUnder20, setChildrenUnder20] = useState("0");
  const [nationalPension, setNationalPension] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [employmentInsurance, setEmploymentInsurance] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseNumber(annualSalary);
    if (salary <= 0) return;

    onCalculate({
      annualSalary: salary,
      nonTaxableIncome: parseNumber(nonTaxableIncome),
      dependents: Math.max(1, parseInt(dependents) || 1),
      childrenUnder20: Math.max(0, parseInt(childrenUnder20) || 0),
      nationalPension: parseNumber(nationalPension),
      healthInsurance: parseNumber(healthInsurance),
      employmentInsurance: parseNumber(employmentInsurance),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 연봉 */}
      <div>
        <label htmlFor="annualSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          연봉 (원)
        </label>
        <input
          id="annualSalary"
          type="text"
          inputMode="numeric"
          placeholder="예: 50,000,000"
          value={annualSalary}
          onChange={(e) => setAnnualSalary(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">세전 연봉 (비과세 포함 총 금액)</p>
      </div>

      {/* 비과세 소득 */}
      <div>
        <label htmlFor="nonTaxableIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          비과세 소득 (원/년)
        </label>
        <input
          id="nonTaxableIncome"
          type="text"
          inputMode="numeric"
          placeholder="예: 2,400,000"
          value={nonTaxableIncome}
          onChange={(e) => setNonTaxableIncome(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">식대 월 20만원(연 240만), 차량유지비 등</p>
      </div>

      {/* 부양가족 수 */}
      <div>
        <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          부양가족 수 (본인 포함)
        </label>
        <select
          id="dependents"
          value={dependents}
          onChange={(e) => setDependents(e.target.value)}
          className="custom-select mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n}명</option>
          ))}
        </select>
      </div>

      {/* 20세 이하 자녀 수 */}
      <div>
        <label htmlFor="childrenUnder20" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          20세 이하 자녀 수
        </label>
        <select
          id="childrenUnder20"
          value={childrenUnder20}
          onChange={(e) => setChildrenUnder20(e.target.value)}
          className="custom-select mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}명</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">자녀세액공제 대상 (부양가족 수에 포함하세요)</p>
      </div>

      {/* 4대보험 */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          4대보험 공제 (선택) ▾
        </summary>
        <div className="mt-3 space-y-4 pl-1">
          <div>
            <label htmlFor="nationalPension" className="block text-sm text-gray-600 dark:text-gray-400">
              국민연금 (원/년)
            </label>
            <input
              id="nationalPension"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={nationalPension}
              onChange={(e) => setNationalPension(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="healthInsurance" className="block text-sm text-gray-600 dark:text-gray-400">
              건강보험 + 장기요양보험 (원/년)
            </label>
            <input
              id="healthInsurance"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={healthInsurance}
              onChange={(e) => setHealthInsurance(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="employmentInsurance" className="block text-sm text-gray-600 dark:text-gray-400">
              고용보험 (원/년)
            </label>
            <input
              id="employmentInsurance"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={employmentInsurance}
              onChange={(e) => setEmploymentInsurance(formatNumberInput(e.target.value))}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>
      </details>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
      >
        세금 계산하기
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
