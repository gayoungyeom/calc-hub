import type { KrTaxConfig, UsTaxConfig } from "@/engine/types";

import kr2026 from "./kr/2026.json";
import us2026 from "./us/2026.json";

const krConfigs: Record<number, KrTaxConfig> = {
  2026: kr2026 as KrTaxConfig,
};

const usConfigs: Record<number, UsTaxConfig> = {
  2026: us2026 as UsTaxConfig,
};

export function getKrConfig(year: number): KrTaxConfig {
  const config = krConfigs[year];
  if (!config) {
    throw new Error(`KR tax config not found for year ${year}`);
  }
  return config;
}

export function getUsConfig(year: number): UsTaxConfig {
  const config = usConfigs[year];
  if (!config) {
    throw new Error(`US tax config not found for year ${year}`);
  }
  return config;
}

export function getAvailableYears(country: "KR" | "US"): number[] {
  const configs = country === "KR" ? krConfigs : usConfigs;
  return Object.keys(configs).map(Number).sort();
}
