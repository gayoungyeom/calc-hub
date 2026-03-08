"use client";

import { useState } from "react";
import type { KrCalculatorInput } from "@/engine/types";

interface Props {
  onCalculate: (input: KrCalculatorInput) => void;
}

export default function KrCalculatorForm({ onCalculate }: Props) {
  const [grossIncome, setGrossIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [dependents, setDependents] = useState("1");
  const [nationalPension, setNationalPension] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [autoPrepaid, setAutoPrepaid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseNumber(grossIncome);
    if (income <= 0) return;

    onCalculate({
      grossIncome: income,
      expenses: parseNumber(expenses),
      dependents: Math.max(1, parseInt(dependents) || 1),
      nationalPension: parseNumber(nationalPension),
      healthInsurance: parseNumber(healthInsurance),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 연간 총수입 */}
      <div>
        <label htmlFor="grossIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          연간 총수입 (원)
        </label>
        <input
          id="grossIncome"
          type="text"
          inputMode="numeric"
          placeholder="예: 36,000,000"
          value={grossIncome}
          onChange={(e) => setGrossIncome(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">3.3% 원천징수 전 총 수입금액</p>
      </div>

      {/* 기납부세액 자동 계산 */}
      {autoPrepaid && grossIncome && (
        <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:bg-dark-blue/15 dark:text-dark-blue">
          기납부세액 (3.3%): <strong>{formatCurrency(Math.round(parseNumber(grossIncome) * 0.033))}원</strong>
        </div>
      )}

      {/* 필요경비 */}
      <div>
        <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          필요경비 (원)
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
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">사업 관련 지출 (선택)</p>
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
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n}명
            </option>
          ))}
        </select>
      </div>

      {/* 사회보험료 */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          사회보험료 공제 (선택) ▾
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
              건강보험 (원/년)
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
        </div>
      </details>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
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

function formatCurrency(value: number): string {
  return value.toLocaleString();
}
