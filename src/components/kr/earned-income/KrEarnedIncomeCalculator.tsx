"use client";

import { useState } from "react";
import type { KrEarnedIncomeInput, KrEarnedIncomeOutput } from "@/engine/kr/earned-income-tax";
import { calculateKrEarnedIncomeTax } from "@/engine/kr/earned-income-tax";
import { trackEvent } from "@/lib/gtag";
import KrEarnedIncomeForm from "./KrEarnedIncomeForm";
import KrEarnedIncomeResult from "./KrEarnedIncomeResult";
import KrEarnedIncomeInsight from "./KrEarnedIncomeInsight";

export default function KrEarnedIncomeCalculator() {
  const [result, setResult] = useState<KrEarnedIncomeOutput | null>(null);
  const [lastInput, setLastInput] = useState<KrEarnedIncomeInput | null>(null);

  const handleCalculate = (input: KrEarnedIncomeInput) => {
    const output = calculateKrEarnedIncomeTax(input);
    setResult(output);
    setLastInput(input);
    trackEvent({
      action: "calculate",
      category: "kr_earned_income_tax",
      label: `salary_${Math.round(input.annualSalary / 1_000_000)}M`,
      value: input.annualSalary,
    });
  };

  return (
    <div className="space-y-8">
      <KrEarnedIncomeForm onCalculate={handleCalculate} />

      {result && lastInput && (
        <>
          <hr className="border-gray-200 dark:border-dark-border" />
          <KrEarnedIncomeResult
            result={result}
            annualSalary={lastInput.annualSalary}
          />
          <KrEarnedIncomeInsight
            result={result}
            annualSalary={lastInput.annualSalary}
          />
        </>
      )}
    </div>
  );
}
