"use client";

import { useState } from "react";
import type { HomeOfficeInput, HomeOfficeOutput } from "@/engine/us/home-office";
import { calculateHomeOfficeDeduction } from "@/engine/us/home-office";
import { trackEvent } from "@/lib/gtag";
import HomeOfficeForm from "./HomeOfficeForm";
import HomeOfficeResult from "./HomeOfficeResult";

export default function HomeOfficeCalculator() {
  const [result, setResult] = useState<HomeOfficeOutput | null>(null);

  const handleCalculate = (input: HomeOfficeInput) => {
    const output = calculateHomeOfficeDeduction(input);
    setResult(output);
    trackEvent({
      action: "calculate",
      category: "us_home_office",
      label: `sqft_${input.officeSqft}`,
      value: input.officeSqft,
    });
  };

  return (
    <div className="space-y-8">
      <HomeOfficeForm onCalculate={handleCalculate} />

      {result && (
        <>
          <hr className="border-gray-200 dark:border-dark-border" />
          <HomeOfficeResult result={result} />
        </>
      )}
    </div>
  );
}
