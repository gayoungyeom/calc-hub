"use client";

import { useState } from "react";
import type { MileageInput, MileageOutput } from "@/engine/us/mileage";
import { calculateMileageDeduction } from "@/engine/us/mileage";
import { trackEvent } from "@/lib/gtag";
import MileageForm from "./MileageForm";
import MileageResult from "./MileageResult";

export default function MileageCalculator() {
  const [result, setResult] = useState<MileageOutput | null>(null);

  const handleCalculate = (input: MileageInput) => {
    const output = calculateMileageDeduction(input);
    setResult(output);
    trackEvent({
      action: "calculate",
      category: "us_mileage",
      label: `miles_${Math.round(input.annualMiles / 1000)}K`,
      value: input.annualMiles,
    });
  };

  return (
    <div className="space-y-8">
      <MileageForm onCalculate={handleCalculate} />

      {result && (
        <>
          <hr className="border-gray-200 dark:border-dark-border" />
          <MileageResult result={result} />
        </>
      )}
    </div>
  );
}
