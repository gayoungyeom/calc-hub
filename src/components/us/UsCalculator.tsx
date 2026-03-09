"use client";

import { useState } from "react";
import type { UsCalculatorInput, UsCalculatorOutput } from "@/engine/types";
import { calculateUsTax } from "@/engine/us/federal-tax";
import { getUsConfig } from "@/config/loader";
import { trackEvent } from "@/lib/gtag";
import UsCalculatorForm from "./UsCalculatorForm";
import UsResultDisplay from "./UsResultDisplay";
import UsInsightPanel from "./UsInsightPanel";

const config = getUsConfig(2026);

interface Props {
  defaultState?: string;
}

export default function UsCalculator({ defaultState }: Props = {}) {
  const [result, setResult] = useState<UsCalculatorOutput | null>(null);
  const [lastInput, setLastInput] = useState<UsCalculatorInput | null>(null);

  const handleCalculate = (input: UsCalculatorInput) => {
    const output = calculateUsTax(input, config);
    setResult(output);
    setLastInput(input);
    trackEvent({
      action: "calculate",
      category: "us_tax",
      label: `${input.state}_${input.filingStatus}_${Math.round(input.grossIncome / 1000)}K`,
      value: input.grossIncome,
    });
  };

  return (
    <div className="space-y-8">
      <UsCalculatorForm onCalculate={handleCalculate} defaultState={defaultState} />

      {result && lastInput && (
        <>
          <hr className="border-gray-200 dark:border-dark-border" />
          <UsResultDisplay result={result} />
          <UsInsightPanel
            result={result}
            grossIncome={lastInput.grossIncome}
            expenses={lastInput.expenses}
            state={lastInput.state}
            filingStatus={lastInput.filingStatus}
          />
        </>
      )}
    </div>
  );
}
