"use client";

import { useState } from "react";
import type { W2vs1099Input, W2vs1099Output } from "@/engine/us/w2-vs-1099";
import { calculateW2vs1099 } from "@/engine/us/w2-vs-1099";
import { getUsConfig } from "@/config/loader";
import { trackEvent } from "@/lib/gtag";
import W2vs1099Form from "./W2vs1099Form";
import W2vs1099Result from "./W2vs1099Result";

const config = getUsConfig(2026);

export default function W2vs1099Calculator() {
  const [result, setResult] = useState<W2vs1099Output | null>(null);

  const handleCalculate = (input: W2vs1099Input) => {
    const output = calculateW2vs1099(input, config);
    setResult(output);
    trackEvent({
      action: "calculate",
      category: "us_w2_vs_1099",
      label: `income_${Math.round(input.annualIncome / 1000)}K`,
      value: input.annualIncome,
    });
  };

  return (
    <div className="space-y-8">
      <W2vs1099Form onCalculate={handleCalculate} />

      {result && (
        <>
          <hr className="border-gray-200 dark:border-dark-border" />
          <W2vs1099Result result={result} />
        </>
      )}
    </div>
  );
}
