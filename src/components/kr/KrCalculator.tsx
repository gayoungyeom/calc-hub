"use client";

import { useState } from "react";
import type { KrCalculatorInput, KrCalculatorOutput } from "@/engine/types";
import { calculateKrIncomeTax } from "@/engine/kr/income-tax";
import { getKrConfig } from "@/config/loader";
import { trackEvent } from "@/lib/gtag";
import KrCalculatorForm from "./KrCalculatorForm";
import KrResultDisplay from "./KrResultDisplay";
import KrInsightPanel from "./KrInsightPanel";

const config = getKrConfig(2026);

export default function KrCalculator() {
  const [result, setResult] = useState<KrCalculatorOutput | null>(null);
  const [lastInput, setLastInput] = useState<KrCalculatorInput | null>(null);

  const handleCalculate = (input: KrCalculatorInput) => {
    const output = calculateKrIncomeTax(input, config);
    setResult(output);
    setLastInput(input);
    trackEvent({
      action: "calculate",
      category: "kr_tax",
      label: `income_${Math.round(input.grossIncome / 1_000_000)}M`,
      value: input.grossIncome,
    });
  };

  return (
    <div className="space-y-8">
      <KrCalculatorForm onCalculate={handleCalculate} />

      {result && lastInput && (
        <>
          <hr className="border-gray-200" />
          <KrResultDisplay
            result={result}
            grossIncome={lastInput.grossIncome}
          />
          <KrInsightPanel
            result={result}
            grossIncome={lastInput.grossIncome}
            expenses={lastInput.expenses}
          />
        </>
      )}
    </div>
  );
}
