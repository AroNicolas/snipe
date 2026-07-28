import type { Throw } from "../types/game";

export function makeThrow(
  value: number,
  multiplier: number,
  zoneKind: "single" | "triple" | "double"
): Throw {
  const points = value * multiplier;
  let label: string;
  if (multiplier === 3) label = `Triple ${value}`;
  else if (multiplier === 2) label = `Double ${value}`;
  else label = String(value);
  return { value, multiplier, zone: zoneKind, points, label };
}

export function makeBullThrow(kind: "bull" | "semi"): Throw {
  if (kind === "bull")
    return { value: 25, multiplier: 2, zone: "bull", points: 50, label: "Bull's-eye" };
  return { value: 25, multiplier: 1, zone: "semi", points: 25, label: "Demi-bull" };
}

export function makeMissThrow(): Throw {
  return { value: 0, multiplier: 0, zone: "miss", points: 0, label: "Raté" };
}
