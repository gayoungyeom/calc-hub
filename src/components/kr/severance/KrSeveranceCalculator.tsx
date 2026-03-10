"use client";

import { useState } from "react";
import type { KrSeveranceInput, KrSeveranceOutput } from "@/engine/kr/severance";
import { calculateKrSeverance } from "@/engine/kr/severance";
import { trackEvent } from "@/lib/gtag";
import KrSeveranceForm from "./KrSeveranceForm";
import KrSeveranceResult from "./KrSeveranceResult";

export default function KrSeveranceCalculator() {
  const [result, setResult] = useState<KrSeveranceOutput | null>(null);

  const handleCalculate = (input: KrSeveranceInput) => {
    const output = calculateKrSeverance(input);
    setResult(output);
    trackEvent({
      action: "calculate",
      category: "kr_severance",
      label: `salary_${Math.round(input.monthlyBaseSalary / 1_000_000)}M`,
      value: input.monthlyBaseSalary,
    });
  };

  return (
    <div className="space-y-8">
      <KrSeveranceForm onCalculate={handleCalculate} />

      {result && (
        <>
          <hr className="border-gray-200 dark:border-dark-border" />
          <KrSeveranceResult result={result} />
        </>
      )}
    </div>
  );
}
