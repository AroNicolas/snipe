import type { Throw } from "../../types/game";

export const X01_THROWS_PER_TURN = 3;

export function applyX01Turn(
  startScore: number,
  throws: Throw[]
): { finalScore: number; busted: boolean; checkedOut: boolean } {
  let score = startScore;

  for (let i = 0; i < throws.length; i++) {
    const t = throws[i];
    const next = score - t.points;
    const isDoubleOrBull = t.multiplier === 2 || t.zone === "bull";

    if (next < 0 || next === 1) {
      return { finalScore: startScore, busted: true, checkedOut: false };
    }
    if (next === 0) {
      if (isDoubleOrBull) {
        return { finalScore: 0, busted: false, checkedOut: true };
      }
      return { finalScore: startScore, busted: true, checkedOut: false };
    }
    score = next;
  }

  return { finalScore: score, busted: false, checkedOut: false };
}

export function isX01TurnComplete(throws: Throw[], startScore: number): boolean {
  if (throws.length >= X01_THROWS_PER_TURN) return true;
  const { busted, checkedOut } = applyX01Turn(startScore, throws);
  return busted || checkedOut;
}
