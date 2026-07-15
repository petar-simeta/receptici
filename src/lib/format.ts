export type RoundingMode = "smart" | "whole" | "half" | "tenth";
export type DurationValue = number | { min: number; max: number };

function roundValue(value: number, rounding: RoundingMode) {
  switch (rounding) {
    case "whole":
      return Math.max(1, Math.round(value));
    case "half":
      return Math.round(value * 2) / 2;
    case "tenth":
      return Math.round(value * 10) / 10;
    default:
      return Math.round(value * 100) / 100;
  }
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("hr-HR", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatScaledAmount(
  value: number,
  unit = "",
  rounding: RoundingMode = "smart",
  oneUnit?: string,
  fewUnit?: string,
) {
  const rounded = roundValue(value, rounding);

  if (unit === "g" && rounded >= 1000) {
    return `${formatNumber(rounded / 1000)} kg`;
  }

  if (unit === "ml" && rounded >= 1000) {
    return `${formatNumber(rounded / 1000)} l`;
  }

  if (!unit) return formatNumber(rounded);

  const lastTwo = rounded % 100;
  const last = rounded % 10;
  const usesFew = Number.isInteger(rounded)
    && last >= 2
    && last <= 4
    && !(lastTwo >= 12 && lastTwo <= 14);
  const displayedUnit = rounded === 1 && oneUnit
    ? oneUnit
    : usesFew && fewUnit
      ? fewUnit
      : unit;

  return `${formatNumber(rounded)} ${displayedUnit}`;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function formatSingleDuration(minutes: number) {
  if (minutes < 180) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder === 0 ? `${hours} h` : `${hours} h ${remainder} min`;
}

export function formatDuration(value: DurationValue) {
  if (typeof value === "number") return formatSingleDuration(value);

  if (value.min >= 180 && value.min % 60 === 0 && value.max % 60 === 0) {
    return `${value.min / 60}–${value.max / 60} h`;
  }

  return `${value.min}–${value.max} min`;
}

export function durationUpperBound(value: DurationValue) {
  return typeof value === "number" ? value : value.max;
}

export function formatMeatOption(grams: number) {
  return grams >= 1000
    ? `${formatNumber(grams / 1000)} kg`
    : `${formatNumber(grams)} g`;
}

export function formatYieldUnit(
  amount: number,
  value: { unit: string; oneUnit?: string; fewUnit?: string },
) {
  if (amount === 1 && value.oneUnit) return value.oneUnit;

  const integer = Number.isInteger(amount);
  const lastTwo = amount % 100;
  const last = amount % 10;
  if (integer && last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
    return value.fewUnit ?? value.unit;
  }

  return value.unit;
}
