"use client";

import { useState } from "react";
import type { KrVatInput, VatTaxpayerType } from "@/engine/kr/vat";

interface Props {
  onCalculate: (input: KrVatInput) => void;
}

export default function KrVatForm({ onCalculate }: Props) {
  const [taxpayerType, setTaxpayerType] = useState<VatTaxpayerType>("general");
  const [revenue, setRevenue] = useState("");
  const [purchases, setPurchases] = useState("");
  const [creditCardRatio, setCreditCardRatio] = useState("80");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rev = parseNumber(revenue);
    if (rev <= 0) return;

    onCalculate({
      taxpayerType,
      revenue: rev,
      purchases: parseNumber(purchases),
      creditCardRatio: parseInt(creditCardRatio) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 과세 유형 */}
      <div>
        <label htmlFor="taxpayerType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          과세 유형
        </label>
        <select
          id="taxpayerType"
          value={taxpayerType}
          onChange={(e) => setTaxpayerType(e.target.value as VatTaxpayerType)}
          className="custom-select mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
        >
          <option value="general">일반과세자</option>
          <option value="simplified">간이과세자</option>
          <option value="exempt">면세사업자</option>
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {taxpayerType === "general" && "연매출 8,000만원 이상 또는 직전연도 매출 기준"}
          {taxpayerType === "simplified" && "연매출 8,000만원 미만 개인사업자"}
          {taxpayerType === "exempt" && "의료, 교육, 금융 등 면세 업종"}
        </p>
      </div>

      {/* 매출액 */}
      <div>
        <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          매출액 — 공급가액 (원)
        </label>
        <input
          id="revenue"
          type="text"
          inputMode="numeric"
          placeholder="예: 50,000,000"
          value={revenue}
          onChange={(e) => setRevenue(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {taxpayerType === "general" ? "부가세 별도 공급가액" : "부가세 포함 총 매출액"}
        </p>
      </div>

      {/* 매입액 */}
      <div>
        <label htmlFor="purchases" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          매입액 — 공급가액 (원)
        </label>
        <input
          id="purchases"
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={purchases}
          onChange={(e) => setPurchases(formatNumberInput(e.target.value))}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white dark:placeholder-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">세금계산서 수취분 매입액</p>
      </div>

      {/* 간이과세자 — 신용카드 매출 비율 */}
      {taxpayerType === "simplified" && (
        <div>
          <label htmlFor="creditCardRatio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            신용카드 매출 비율 (%)
          </label>
          <select
            id="creditCardRatio"
            value={creditCardRatio}
            onChange={(e) => setCreditCardRatio(e.target.value)}
            className="custom-select mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-border dark:bg-dark-card dark:text-white"
          >
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => (
              <option key={n} value={n}>{n}%</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">신용카드 매출전표 발행 세액공제 적용</p>
        </div>
      )}

      {taxpayerType === "exempt" && (
        <div className="rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
          면세사업자는 부가가치세 납부 의무가 없습니다. 다만 매년 2월 사업장 현황 신고를 해야 합니다.
        </div>
      )}

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
      >
        부가가치세 계산하기
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
