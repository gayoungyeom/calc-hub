"use client";

import { useState } from "react";
import type { KrVatInput, KrVatOutput } from "@/engine/kr/vat";
import { calculateKrVat } from "@/engine/kr/vat";
import { trackEvent } from "@/lib/gtag";
import KrVatForm from "./KrVatForm";
import KrVatResult from "./KrVatResult";

export default function KrVatCalculator() {
  const [result, setResult] = useState<KrVatOutput | null>(null);

  const handleCalculate = (input: KrVatInput) => {
    const output = calculateKrVat(input);
    setResult(output);
    trackEvent({
      action: "calculate",
      category: "kr_vat",
      label: `type_${input.taxpayerType}_revenue_${Math.round(input.revenue / 1_000_000)}M`,
      value: input.revenue,
    });
  };

  return (
    <div className="space-y-8">
      <KrVatForm onCalculate={handleCalculate} />

      {result && (
        <>
          <hr className="border-gray-200 dark:border-dark-border" />
          <KrVatResult result={result} />
        </>
      )}
    </div>
  );
}
