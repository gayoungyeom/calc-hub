"use client";

import { useState } from "react";
import type { UsCalculatorInput, UsCalculatorOutput } from "@/engine/types";
import { calculateUsTax } from "@/engine/us/federal-tax";
import { getUsConfig } from "@/config/loader";
import UsCalculatorForm from "./UsCalculatorForm";
import UsResultDisplay from "./UsResultDisplay";
import UsInsightPanel from "./UsInsightPanel";

const config = getUsConfig(2026);

export default function UsCalculator() {
  const [result, setResult] = useState<UsCalculatorOutput | null>(null);
  const [lastInput, setLastInput] = useState<UsCalculatorInput | null>(null);

  const handleCalculate = (input: UsCalculatorInput) => {
    const output = calculateUsTax(input, config);
    setResult(output);
    setLastInput(input);
  };

  return (
    <div className="space-y-8">
      <UsCalculatorForm onCalculate={handleCalculate} />

      {result && lastInput && (
        <>
          <hr className="border-gray-200" />
          <UsResultDisplay result={result} />
          <UsInsightPanel
            result={result}
            grossIncome={lastInput.grossIncome}
            state={lastInput.state}
          />
        </>
      )}
    </div>
  );
}
